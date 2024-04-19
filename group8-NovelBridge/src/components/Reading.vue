<template>
    <LayoutHeader/>
    <div id="reading-page">
    <div id="reading_pane">
        <button id="gotohome" @click="goToHome">< {{bookName}}</button>
        <h1>Chapter {{ chapter }}:</h1>
        <div id="text">
            {{ chapter_data }}
        </div>
        <div id="footer_pane">
        <!-- for the previous and next button -->
        <button id="gotoprevious" @click="goToPreviousChapter" :disabled="chapter_num === 1">Previous</button>
        <button id="gotonext" @click="goToNextChapter" :disabled="chapter_num === totalChapters">Next</button>
        </div>
    </div>

    <div id="right_pane">
        <img src="@/assets/bookicon.png" alt="User profile img" class="profileImg">
    </div>
    </div>
</template>

<script>

import firebaseApp from '../firebase.js';
import LayoutHeader from '@/components/LayoutHeader.vue';
import { getFirestore, collection, getDocs, doc, deleteDoc,getDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth, signOut, onAuthStateChanged, FacebookAuthProvider } from "firebase/auth";

export default {
    components: {
        LayoutHeader
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
#reading-page{
  display: flex;
  justify-content: space-between;
}

#left_pane {
  width: 15%;
}

#right_pane {
  display: flex;
  flex-direction:column;
  justify-content: center; /* Aligns vertically in the center */
  align-items: center; /* Aligns horizontally in the center */
  width: 15%;
  height: 100vh;
}

#reading_pane {
  padding:20px;
  margin:auto;
  width: 70%; /* Adjust width as necessary */
  background-color: #F4F2EC; /* Match the color to the image provided */
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* To add slight shadow around the reading pane */
}

#reading_pane h1{
  margin-left:25px;
  font-size: 25px;
  
}

#gotohome{
  display: block;
  margin: 0.5em 0;
  padding: 0.5em;
  background-color: transparent;
  border: none;
  font-size: 17px;
  color: black;
  font-weight:bolder;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
#text {
  text-align: left;
  padding: 1.5em;
  font-size: 1em;
 /* Match the color scheme */
}

button {
  background-color: #E8CC81; /* Or another color based on the image */
  border: none;
  font-weight:bolder;
  padding: 0.5em 1em;
  margin: 0.5em 0;
  cursor: pointer;
  border-radius:10px;
}

button:hover {
  background-color: #f78636; /* A darker shade for hover state */
}

#footer_pane {
  display:flex;
  justify-content: space-around;
  padding: 1em 0;
  
}
</style>