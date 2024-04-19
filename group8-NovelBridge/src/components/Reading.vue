<template>
    <LayoutHeader></LayoutHeader>
    <div id="left_pane">
        <!-- for advertizing -->
    </div>

    <div id="reading_pane">
        <br>
        <button id="gotohome" @click="goToHome">< {{bookName}}</button>
        <br>
        <h1 id="title">Chapter {{ chapter }}</h1>
        <br>
        <div id="text">
            {{ chapter_data }}
        </div>
        <br>
        <div id="footer_pane">
        <!-- for the previous and next button -->
            <button id="gotoprevious" @click="goToPreviousChapter" :disabled="chapter_num === 1">Prev</button>
            <button id="gotonext" @click="goToNextChapter" :disabled="chapter_num === totalChapters">Next</button>

        </div>
        <br><br>
    </div>

    <div id="right_pane">
        <img src="@/assets/bookicon.png" alt="User profile img" class="profileImg">
    </div>
    </div>
</template>

<script>
import LayoutHeader from '@/components/LayoutHeader.vue';
import firebaseApp from '../firebase.js';
import LayoutHeader from '@/components/LayoutHeader.vue';
import { getFirestore, collection, getDocs, doc, deleteDoc,getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth, signOut, onAuthStateChanged, FacebookAuthProvider } from "firebase/auth";


export default {
    components: {
        LayoutHeader,
        // ... any other components
    },
    props: {
        name : String,
        chapter: Number
    },
    data() {
      return {
        curr_chapter: '',
        bookName: '',
        chapters_list: [],
        chapter_num: 0,
        chapter_data: ''
      }
    },
    created(){
        if (this.$route.params.name) {
            this.bookName = this.$route.params.name;
            console.log(this.bookName);
            console.log("tryout");
            this.bookId = this.$route.params.bookId;
        // continue with Firebase logic...
        } else {
        console.error('Route parameters are missing');
        }
        //this.userId = firebase.auth().currentUser.uid; 
        this.chapter_num = this.$route.params.chapter;//this.$route.params.chapter;
        const storage = getStorage(firebaseApp);
        const novelsRef= storageRef(storage, '/Novels/' + this.bookName);
        console.log(this.chapter_num);

        listAll(novelsRef).then((result) => {
            this.files = result.items.filter((item) => item.name.endsWith(".txt"));
            // Since these are methods, they should be called with 'this.'
            this.getChapterData();
            });
        },

    methods: {

  goToHome() {
    this.$router.push({
      name: 'BookDetail', 
      params: { id: this.bookId } 
    });
  },
        getChapterData(){
            this.chapter_data = '';
            const storage = getStorage(firebaseApp);
            const chaptersRef = storageRef(storage, `Novels/${this.bookName}`);
            listAll(chaptersRef).then((result) => {
            const chapterFileRef = result.items.find((itemRef) => {
            return itemRef.name.includes(`Chapter ${this.chapter_num}`);
            });
            if (chapterFileRef) {
                // If the chapter file is found, get its download URL and fetch its content
                getDownloadURL(chapterFileRef).then((url) => {
                fetch(url)
                .then((response) => response.text())
                .then((text) => {
                    this.chapter_data = text;
                })
                .catch((error) => {
                    console.error("Error fetching file content:", error);
                });
                });
            } else {
                console.error(`No file found for Chapter ${this.chapter_num}`);
            }
            }).catch((error) => {
            console.error("Error listing chapter files:", error);
            });
        },
        async goToNextChapter() {
            this.chapter_num = parseInt(this.chapter_num, 10) + 1;
            console.log(this.chapter_num);
            await this.getChapterData();
            await this.updateUserProgress();
            this.$router.push({
                name: 'ReadingPanel', // The name of the route as defined in your Vue Router
                params: {
                name: this.bookName,
                chapter: this.chapter_num,
                bookId: this.bookId
                }
            });
        },
        async goToPreviousChapter() {
            if (this.chapter_num > 1) {
                this.chapter_num = parseInt(this.chapter_num, 10) - 1; // Decrease the chapter number
                console.log(`Moving to chapter: ${this.chapter_num}`);
                await this.getChapterData(); // Fetch the new chapter data
                await this.updateUserProgress(); // Update the user's progress

      // Update the URL without navigating
            this.$router.replace({
                name: 'ReadingPanel',
                params: {
                name: this.bookName,
                chapter: this.chapter_num,
                bookId: this.bookId,
                userId: this.$route.params.userId // Include the userId if necessary
                }
            });
    } else {
      console.error("This is the first chapter, cannot go to the previous one.");
    }
  },

        async updateUserProgress() {
            const db = getFirestore(firebaseApp);
            const userId = this.$route.params.userId;
            console.log(userId);
            const userDocRef = doc(db, "users", userId);
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                let progress = userDoc.data().Progress || [];
                let progressToUpdate = {};
                if (progress.length > 0) {
                    progressToUpdate = progress[0];
                }
                progressToUpdate[this.bookId] = this.chapter_num;
                await updateDoc(userDocRef, {
                    Progress : [progressToUpdate]
                });
            } else {
                console.error("User document does not exist");
            }
        },

    },
    async mounted() {


    }
}
</script>

<style>
#left_pane,#rightpane{
    width: 15%;
    float: left;
}

#reading_pane {
    float: left;
    background-color: #F4F2EC;
    font-size: 16px;
    margin-left: 50px;
    margin-right: 50px;
}
#footer_pane {
    text-align: center;
}
#gotohome{
    border: none;
    background-color: #F4F2EC;
    padding-left: 5px;
    font-size: 16px;
}
#gotonext,#gotoprevious {
    background-color: #E8CC81;
    padding-left: 5px;
    font-size: 16px;
    padding: 5px;
    margin-right: 30px;
    border-radius: 50px;
    width:150px;
    border-width: 0;
}
#text {
    text-align: center;
    padding: 5px 15px;
    font-size: 16px;
    margin-right: 80px;
    margin-left: 100px;

}
.button{
    padding: 40px;
    margin: auto;
    font-size: 16px;
    
}
#title {
    margin-left: 80px;
    font-weight: bold;
}


</style>