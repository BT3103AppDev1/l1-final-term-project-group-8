<template>
    <LayoutHeader/>
    <div class="reading-page">
    <div id="left_pane">
        <!-- for advertizing -->
    </div>

    <div id="reading_pane">
            <br>
            <div id="gotohome" @click="goToHome">{{ bookName }}</div>
            <br>
            <h1 id="title">Chapter {{ chapter }}</h1>
            <br>
            <div id="text">
                <p v-for="(paragraph, index) in paragraphs" :key="index" v-bind:style="{ fontSize: this.fontSize + 'px' }">
                    {{ paragraph }}
                </p>
            </div>
            <br>
            <div id="footer_pane">
                <button id="gotoprevious" @click="goToPreviousChapter" :disabled="chapter_num === 1">Prev</button>
                <button id="gotonext" @click="goToNextChapter" :disabled="chapter_num === totalChapters">Next</button>
            </div>
            <br><br>
        </div>

    <div id="right_pane">
        <div class="icon-container" @click="goToHome">
            <img src="@/assets/bookicon.png" alt="chapter icon" class="icon2">
            <h5>Chapters</h5>
        </div>
        <div class="icon-container" @click="increaseFontSize">
            <img src="@/assets/A.png" alt="font size icon" class="icon">
            <h5>Font ++</h5>
        </div>
        <div class="icon-container" @click="decreaseFontSize">
            <img src="@/assets/A.png" alt="font size icon" class="icon">
            <h5>Font --</h5>
        </div>
        <div class="icon-container" @click="toggleBookmark">
            <img src="@/assets/Bookmark.png" alt="bookmark icon" class="icon">
            <h5>{{ this.isBookmarked ? 'Bookmarked' : 'Bookmark' }}</h5>
        </div>
        <div class="icon-container" @click="toggleFavourite">
            <img v-if="this.isFavourite" src="@/assets/heart-filled.jpg" alt="bookmark icon" class="icon2">
            <img v-else src="@/assets/heart-unfilled.jpg" alt="bookmark icon" class="icon2">
            <h5>Favourite</h5>
        </div>
        <div class="icon-container" @click="changeLanguage">
            <img src="@/assets/world.png" alt="bookmark icon" class="icon2">
            <h5>Language</h5>
        </div>
    </div>
    </div>
</template>

<script>
import firebaseApp from '../firebase.js';
import LayoutHeader from '@/components/LayoutHeader.vue';
import { getFirestore, collection, getDocs, doc, deleteDoc,getDoc, updateDoc,arrayUnion, arrayRemove } from 'firebase/firestore';
import { getStorage, ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth, signOut, onAuthStateChanged, FacebookAuthProvider } from "firebase/auth";


export default {
    components: {
        LayoutHeader,
        // ... any other components
    },
    props: {
        name : String,
        chapter: String
    },
    data() {
      return {
        curr_chapter: '',
        bookName: '',
        chapters_list: [],
        chapter_num: 0,
        chapter_data: '',
        isBookmarked: false,
        isFavourite: false,
        bookId: '',
        userid:'',
        fontSize: 16

      }
    },
    computed: {
        paragraphs() {
            return this.chapter_data.split(/\r?\n/).filter(paragraph => paragraph.length > 0);
        }
    },
    created(){
        if (this.$route.params.name) {
            this.bookName = this.$route.params.name;
            console.log(this.bookName);
            console.log("tryout");
            this.bookId = this.$route.params.bookId;
            this.userId = this.$route.params.userId;
            
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
        changeLanguage() {
            this.$router.push({
            name: 'EditProfile', 
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
        
        async toggleFavourite() {
            console.log('toggleFavourite called');
            const db = getFirestore(firebaseApp);
            const bookId = this.bookId; 
            const userId = this.userId;
            const userDocRef = doc(db, "users", userId);
            const userDocSnap = await getDoc(userDocRef);
            console.log('1')

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                console.log('2')
                let { Favourite } = userData;
                console.log('3')
                console.log(Favourite)
                
                // Toggle the favourite status
                if (!Favourite.includes(bookId)) {
                    console.log('3.5')
                // If it's not already a favourite, add it to the favourites
                    await updateDoc(userDocRef, {
                        Favourite: arrayUnion(bookId)
                        
                    });
                    this.isFavourite = true;
                    console.log('4')
                } else {
                // If it is already a favourite, remove it from the favourites
                    await updateDoc(userDocRef, {
                        Favourite: arrayRemove(bookId)
                    });
                    this.isFavourite = false;
                    console.log('5')
                }
                console.log(this.isFavourite ? 'added to favourites' : 'removed from favourites');
            } else {
                console.error('User document does not exist');
            }
        },

        async toggleBookmark() {
            console.log('toggleBookmark called');
            const db = getFirestore(firebaseApp);
            const bookId = this.bookId; // Assuming this.book.id is already set
            const userId = this.userId;
            const userDocRef = doc(db, "users", userId);
            const userDocSnap = await getDoc(userDocRef);

            if (userDocSnap.exists()) {
                const userData = userDocSnap.data();
                let { Unread, Ongoing, Completed, Progress } = userData;

                // Check if the book is already bookmarked
                this.isBookmarked = Completed.includes(bookId) ||
                                        Ongoing.includes(bookId) ||
                                        Unread.includes(bookId);
                console.log(this.isBookmarked);

                if (!this.isBookmarked) {
                    // If not bookmarked, determine where to add
                    const bookProgress = Progress[bookId] || 0;
                    const updates = bookProgress === 0 ? { Unread: arrayUnion(bookId) } : { Ongoing: arrayUnion(bookId) };

                    // Perform the update
                    await updateDoc(userDocRef, updates);
                    this.isBookmarked = true;
                } else {
                // If bookmarked, remove from all arrays
                    await updateDoc(userDocRef, {
                        Unread: arrayRemove(bookId),
                        Ongoing: arrayRemove(bookId),
                        Completed: arrayRemove(bookId)
                    });
                    console.log('removed');
                    this.isBookmarked = false;
                    }
            } else {
                console.error('User document does not exist');
            }
        },

        increaseFontSize() {
            this.fontSize = this.fontSize+1;
        },

        decreaseFontSize() {
            this.fontSize = this.fontSize-1;
        }
    },

    async mounted() {
        console.log(this.userId)
        const db = getFirestore(firebaseApp);
        if (this.userId) {
                const userDocRef = doc(db, "users", this.userId);
                const userDocSnap = await getDoc(userDocRef);
                console.log(this.isFavourite)

                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const { Unread, Ongoing, Completed, Favourite } = userData;
                    this.isBookmarked = [Unread, Ongoing, Completed].some(list => list.includes(this.bookId));
                    this.isFavourite = Favourite.includes(this.bookId);
                } else {
                    console.error("Error fetching user details.");
                }
                console.log(this.isFavourite)
        }

    }
}
</script>

<style>
.reading-page{
  display: flex;
  justify-content: center;
}

#reading_pane {
    background-color: #F4F2EC;
    font-size: 16px;
    margin:auto;
    width:75%;
}
#footer_pane {
    text-align: center;
}
#gotohome{
    cursor: pointer;
    background-color: #F4F2EC;
    padding-left:8px;
    font-size: 18px;
    font-weight:bolder;
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
    cursor: pointer;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
p {
    margin-bottom: 10px;  /* Adds space between paragraphs */
    line-height: 1.6;    /* Increases the space between lines in a paragraph */
}
#text {
    text-align: left;
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

#right_pane {
  margin-top: 40px;
  position:fixed;
  display:flex;
  flex-direction:column;
  justify-content: space-around;
  gap:15px;
  align-items:center;
  margin-left:85%; /* Aligns vertically in the center */
}

.icon-container {
  padding: 3px;
  margin-top:15px;
  cursor: pointer;  
  display: flex;
  flex-direction:column;
  align-items: center; /* Center icon vertically */
  justify-content: center; /* Center icon horizontally */
  height:100%; /* Divide by the number of icons */
  width: 90px;
  border-radius: 10px;
  background-color: #E8CC8E/* Ensure wrappers fill the width of the container */
}

.icon-container h5{
    padding:3px;
    padding-top: 0px;
}

.icon{
  padding:10px;
  padding-bottom: 0px;
  height:auto; /* or any size you prefer */
  width: 40px; /* maintains the aspect ratio */
  object-fit: contain
}

.icon2{
  padding:7px;
  padding-bottom: 0px;
  height:auto; /* or any size you prefer */
  width: 40px; /* maintains the aspect ratio */
  object-fit: contain
}


</style>