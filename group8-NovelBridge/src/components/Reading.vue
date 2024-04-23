<template>
    <LayoutHeader/>
    <div class="reading-page">
    <div id="left_pane">
        <!-- for advertizing -->
    </div>

    <div id="reading_pane">
            <br>
            <div id="gotohome" @click="goToHome">< {{ bookName }}</div>
            <br>
            <h1 id="title">Chapter {{ chapter }}</h1>
            <br>
            <div id="text">
  <p v-for="(paragraph, index) in paragraphs" :key="index" v-bind:style="{ fontSize: fontSize + 'px' }">
    <span v-html="decodeHtml(paragraph)"></span>
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
    <Footer></Footer>
</template>

<script>
import firebaseApp from '../firebase.js';
import LayoutHeader from '@/components/LayoutHeader.vue';
import { getFirestore, collection, getDocs, doc, deleteDoc,getDoc, updateDoc,arrayUnion, arrayRemove } from 'firebase/firestore';
import { getStorage, ref as storageRef, listAll, getDownloadURL } from 'firebase/storage';
import { getAuth, signOut, onAuthStateChanged, FacebookAuthProvider } from "firebase/auth";
import axios from 'axios';
import Footer from './Footer.vue';

export default {
    components: {
        LayoutHeader,
        Footer
        // ... any other components
    },
    props: {
        name : String,
        chapter: String,
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
        translatedText: '',
        fontSize: 16,
        totalChapters:0,
        bookId: '',
        userId: '',

      }
    },
    computed: {
        paragraphs() {
    if (this.translatedText) {
      // If translatedText contains newline characters to indicate paragraphs
      return this.translatedText.split(/\n\n+/);
    }
    // Fall back to original text paragraphs if no translation is available
    return this.chapter_data.split(/\r?\n/);
  }
    },
    created(){
        if (this.$route.params.name) {
            this.bookName = this.$route.params.name;
            this.bookId = this.$route.params.bookId;
            this.userId = this.$route.params.userId;
            
        // continue with Firebase logic...
        } else {
        console.error('Route parameters are missing');
        }
        //this.userId = firebase.auth().currentUser.uid; 
        this.chapter_num = this.$route.params.chapter;//this.$route.params.chapter;
        console.log(this.chapter_num);
        const storage = getStorage(firebaseApp);
        const novelsRef= storageRef(storage, '/Novels/' + this.bookName);

        listAll(novelsRef).then((result) => {
            this.files = result.items.filter((item) => item.name.endsWith(".txt"));
            // Since these are methods, they should be called with 'this.'
            this.getChapterData();
        });
    },

    methods: {
        decodeHtml(html) {
    var textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
  },
  postProcessTranslation(text) {
      // Move any quotation marks that are alone on a line back to the end/beginning of the previous/next line
      text = text.replace(/\n\s*”/g, '”'); // Move closing quotes to end of the previous line
      text = text.replace(/“\s*\n/g, '“'); // Move opening quotes to beginning of the next line

      // Refine this further based on actual patterns in your text
      // ...

      return text;
    },


        goToHome() {
            this.$router.push({
            name: 'BookDetail', 
            params: { id: this.bookId } 
            });
        },
    
        async getChapterData() {
  this.chapter_data = '';
  const storage = getStorage(firebaseApp);
  const chaptersRef = storageRef(storage, `Novels/${this.bookName}`);
  
  try {
    const db = getFirestore(firebaseApp);
    const userDocRef = doc(db, "users", this.userId); // Assuming you have this.userId set correctly
    const userDocSnap = await getDoc(userDocRef);
    
    let userLanguage = 'en'; // Default language
    if (userDocSnap.exists()) {
      userLanguage = userDocSnap.data().language || 'en'; // or whatever field you have for language preference
    } else {
      console.log("User document not found, proceeding with default language.");
    }
    listAll(chaptersRef).then((result) => {
      this.files = result.items.filter((item) => item.name.endsWith(".txt"));
      this.totalChapters = this.files.length;
    });
    const result = await listAll(chaptersRef);
    const chapterFileRef = result.items.find(itemRef => itemRef.name.includes(`Chapter ${this.chapter_num}`));
    
    if (chapterFileRef) {
      const url = await getDownloadURL(chapterFileRef);
      const response = await fetch(url);
      let text = await response.text();
      if (userLanguage && userLanguage !== 'en') {
        await this.translateText(text, userLanguage);
      } else {
        this.chapter_data = text;
      }
      
      this.chapter_data = text;
    } else {
      console.error(`No file found for Chapter ${this.chapter_num}`);
    }
  } catch (error) {
    console.error("Error fetching chapter data:", error);
  }
},

translateText(text, userLanguage) {
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

      // Make a POST request to the API
      axios.post(url, {
        q: text,
        target: userLanguage,
      })
      .then(response => {
    let translatedTextWithParagraphs = response.data.data.translations[0].translatedText;

    // For languages like Chinese and Japanese, split the text by full stop characters used in these languages.
    if(userLanguage === 'zh' || userLanguage === 'ja') {
      // The regular expression \u3002 is the Unicode for the "。" full stop character
      // used in Chinese and Japanese. The same for \uff1f for the "？" question mark.
      translatedTextWithParagraphs = translatedTextWithParagraphs.replace(/(\u3002|\uff1f|\uff01)/g, "$1\n\n");
    } else {
      // For other languages, assuming sentences end with a period followed by a space.
      translatedTextWithParagraphs = translatedTextWithParagraphs.replace(/\. /g, '.\n\n');
    }
    translatedTextWithParagraphs = this.postProcessTranslation(translatedTextWithParagraphs);

    this.translatedText = translatedTextWithParagraphs;
  })
      .catch(error => {
        console.error('Error translating text:', error);
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
        // Retrieve the existing progress map or initialize it if it doesn't exist
        let progress = userDoc.data().Progress || {};

        // Update the progress for this bookId
        progress[this.bookId] = this.chapter_num;

        // Update the progress in Firestore
        await updateDoc(userDocRef, {
            Progress: progress
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
            if (userId === '-1') {
                this.$router.push({ 
                name: 'Bookmarked',
                })
                console.log("directed to bookmarked")
            } 
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
            console.log(userId);
            if (userId === '-1') {
                this.$router.push({ 
                name: 'Bookmarked',
                })
                console.log("directed to bookmarked")
            }
            else {
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
                console.log('User document does not exist');
            }
        }},
        
        increaseFontSize() {
            this.fontSize = this.fontSize+1;
        },

        decreaseFontSize() {
            this.fontSize = this.fontSize-1;
        }
    },

    async mounted() {
        const db = getFirestore(firebaseApp);
        if (this.userId) {
                const userDocRef = doc(db, "users", this.userId);
                const userDocSnap = await getDoc(userDocRef);
                if (userDocSnap.exists()) {
                    const userData = userDocSnap.data();
                    const { Unread, Ongoing, Completed, Favourite } = userData;
                    this.isBookmarked = [Unread, Ongoing, Completed].some(list => list.includes(this.bookId));
                    this.isFavourite = Favourite.includes(this.bookId);
                } else {
                    console.error("Error fetching user details.");
                }
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
  gap:10px;
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