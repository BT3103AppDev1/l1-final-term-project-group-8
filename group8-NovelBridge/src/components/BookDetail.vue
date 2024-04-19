<template>
  <LayoutHeader></LayoutHeader><br>
  <div class="book-detail">
    <div class="book-container">
      <img :src="book.cover" alt="bookcover" class="book-cover" />
      <div class="book-info">
        <h2>{{ book.title }}</h2><br>
        <p>Author: {{ book.author }}</p>
        <span class="genre-badge">{{ book.category}}</span>
      
      <div class="book-stats">
        <span class="page-count"><span class="highlighted-number">{{ book.wordCount }}</span> <span class="text-label">words</span></span> |
        <span><span class="highlighted-number">{{ book.views }}K</span> <span class="text-label">views</span></span>
      </div>
    </div>
    </div>


    <div class="actions">
      <button @click="readBook()" class="read-btn">Read</button>
      <button @click="toggleBookmark" class="bookmark-btn">{{ book.isBookmarked ? 'Added' : 'Add to Bookmark' }}</button>
      <button @click="toggleFavourite" class="favourite-btn">
        <div v-if="book.isFavourite">
          <img  src="@/assets/heart-filled.jpg" alt="Favourite icon" class="heart-icon">
        </div>
        <div v-else>
          <img  src="@/assets/heart-unfilled.jpg" alt="Favourite icon" class="heart-icon">
        </div>
      </button>
    </div>

    
  </div>

  <div class="about-content">
  <div class="book-description">
    <h3>ABOUT</h3><hr>
    <p>{{ book.description }}</p>
  </div>

  <div class="book-content">
    <h3>CONTENT - {{ book.chapters.length }} Chapters</h3><hr>
    <ul class="chapters-list">
  <li v-for="(chapter, index) in book.chapters" :key="index" class="chapter-item">
    {{ chapter }}
  </li>
</ul>
  </div>
</div>



</template>

<script>
import firebaseApp from "@/firebase";
import {getFirestore, doc, getDoc, collection, updateDoc} from "firebase/firestore";
import LayoutHeader from '@/components/LayoutHeader.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default {
  data() {
    return {
      book: {
        id: '',
        title: '',
        author: '',
        category: '',
        wordCount: 0,
        views: 0,
        isBookmarked: false,
        isFavourite: false,
        description: '',
        chapters: [],
        cover: '',
        Chapter_Content: [],
      }
    }
  },
  components: {
    LayoutHeader,
    // ... any other components
  },
  props: {
    id: String
  },
  created(){
    const auth = getAuth(firebaseApp);
    onAuthStateChanged(auth, user => {
      if (user) {
        this.userID = user.uid;
        console.log(user.uid);
      } else {
        console.error("No user logged in!");
      }
    });
  },
  async mounted() {
    const db = getFirestore(firebaseApp);
    const bookId = this.$route.params.id;
    this.book.id = bookId
    console.log(bookId);
    const docInfo = doc(db, "Books", bookId);
    const queryBook = await getDoc(docInfo)
    
    if(queryBook.exists()) {
      const bookDetails = queryBook.data()
      this.book.title = bookDetails.Title;
      this.book.author = bookDetails.Author;
      this.book.category = bookDetails.Category.join(', ');
      this.book.wordCount = bookDetails["Word Count"]
      this.book.views = bookDetails.Clicks;
      this.book.chapters = Array.from({ length: bookDetails.Chapters }, (_, i) => `Chapter ${i + 1}`);
      this.book.cover = bookDetails.Cover;
      this.book.Chapter_Content = bookDetails.Chapter_Content;

      }
    else {
      console.error("Error in fetching books")
    }
    const userInfo = doc(db, "users", this.userID);
    const userDoc = await getDoc(userInfo);
    
    if(userDoc.exists()) {
      const userData = userDoc.data();
      const unread = userData.Unread;
      const ongoing = userData.Ongoing;
      const completed = userData.Completed;
      const fav = userData.Favourite;
      if (this.book.isBookmarked = false) {
        for (let k = 0; i <length(unread); k++ ){
          if (unread[k] == this.book.id) {
            this.book.isBookmarked = true;
            break
          }
        }
      }
      if (this.book.isBookmarked = false) {
        for (let k = 0; i <length(ongoing); k++ ){
          if (ongoing[k] == this.book.id) {
            this.book.isBookmarked = true;
            break
          }
        }
      }
      if (this.book.isBookmarked = false) {
        for (let k = 0; i <length(completed); k++ ){
          if (completed[k] == this.book.id) {
            this.book.isBookmarked = true;
            break
          }
        }
      }
      if (this.book.isFavourite = false) {
        for (let k = 0; i <length(fav); k++ ){
          if (fav[k] == this.book.id) {
            this.book.isFavourite = true;
            break
          }
        }
      }
    }
    else {
      console.error("Error in fetching books")
    }

  },

  methods: {
    toggleBookmark() {
      this.book.isBookmarked = !this.book.isBookmarked;
      const bookId = this.$route.params.id;
      const userId = firebase.auth().currentUser.uid; 
      const db = firebase.firestore();
      
      const bookmarksRef = db.collection('users').doc(userId);
      const newBookmarkStatus = !this.book.isBookmarked;
      
      bookmarksRef.get().then((doc) => {
        if (doc.exists) {
          bookmarksRef.update({
            [`bookmarks.${bookId}`]: this.book.isBookmarked
          })
          .then(() => {
            console.log('Add to bookmark!');
          })
          .catch((error) => {
            console.error('Error updating bookmark status:', error);
            this.book.isBookmarked = !this.book.isBookmarked;
          });
        } else {
          bookmarksRef.set({
            bookmarks: {
              [bookId]: this.book.isBookmarked
            }
          })
          .then(() => {
            console.log('User document created with bookmark!');
          })
          .catch((error) => {
            console.error('Error creating user document with bookmark:', error);
            this.book.isBookmarked = !this.book.isBookmarked;
          });
        }
      });  
    },
    
    toggleFavourite() {
      this.book.isFavourite = !this.book.isFavourite;
      // Further favourite logic goes here
    },

    async readBook() {
  const db = getFirestore(firebaseApp);
  const bookId = this.$route.params.id;
  const userId = this.userID;
  const userDocRef = doc(db, "users", userId);
  const userDoc = await getDoc(userDocRef);

  let chapterToStart = 1; // Default to start reading from the first chapter

  if(userDoc.exists()) {
    const userData = userDoc.data();
    let progress = userData.Progress;

    // Create a new object for the progress if it doesn't already exist
    const progressToUpdate = progress && progress.length > 0 ? progress[0] : {};

    // Check if the bookId is already in the progress object
    const bookProgress = progressToUpdate[bookId];

    if (!bookProgress) {
      // If not, set the progress to start at chapter 1
      progressToUpdate[bookId] = chapterToStart;

      // Update the user document with the new progress
      await updateDoc(userDocRef, {
        Progress: [progressToUpdate]
      });

      console.log(`Progress updated to start at chapter 1 for bookId ${bookId}.`);
    } else {
      // If the bookId is already in progress, set chapterToStart to the last read chapter
      chapterToStart = bookProgress;
    }
  } else {
    console.error("Error in fetching user data");
  }

  // Navigate to the ReadingPanel with the starting chapter
  this.$router.push({
    name: 'ReadingPanel',
    params: {
      name: this.book.title,
      chapter: chapterToStart,
      bookId: this.book.id,
      userId: this.userID,
    }
  });
},
  },
}
</script>


<style scoped>

.book-container {
  display: flex; /* This will create a flexbox container */
  align-items: start; /* Aligns items to the start of the container */
  gap: 20px; /* Adjust the gap between the book cover and details */
}


 .book-cover {
  width: 150px; /* Set the width of the image */
  height: auto;
}

.chapters-list {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none; /* Removes bullet points */
  padding: 0; /* Removes default padding */
  margin: 0; /* Removes default margin */
  gap: 20px; /* Adjust as necessary for spacing between chapters */
}

.chapter-item {
  flex-basis: calc(15% - 10px);; /* Adjust percentage for three items per row and subtract gap */
  text-align: center; /* Center the chapter titles if desired */
  padding: 5px 0; /* Adds some padding above and below each chapter title */
}

.genre-badge {
  color: grey;
  border: 1px solid #cccccc; /* Add a light grey border */
  padding: 5px 10px; /* Add some padding inside the badge */
  border-radius: 15px; /* Rounded corners for the badge */
  display: inline-block; /* Ensures padding and border-radius are applied */
  margin-top: 5px; /* Optional: adds some space above the badge */
  font-size: 0.8em; 
}

.actions button {
  border-radius: 10px; 
  width: 120px; 
  text-align: center; 
}

.read-btn:hover {
  background-color: #f5f5f5; /* Or any other color you prefer */
  cursor: pointer;
}

.read-btn {
    border: none; 
    margin-right: 10px;
    width: 30px;
    background-color: rgba(244, 222, 184, 0.769)
}

.bookmark-btn {
background-color: white;  
border-color: darkgray;
margin-right: 10px;
}


.book-stats {
  /* Styles for the book stats */
}

.highlighted-number {
font-size: 25px; /* Adjust the font size as needed */
color: black; /* Ensure the numbers are black */
}

.text-label {
color: grey; /* Make the text grey */
}

.heart-icon {
width: 24px; /* Adjust the size of the heart icon */
height: 30px;
margin-right: 5px; /* Space between the icon and the text */
}
.favourite-btn {
  background-color: transparent; 
  border: none; 
}

.about-content {
background: #F4F2EC;
margin-top: 20px; 
padding: 15px;
}

.book-description {
  
}


.chapters-row {
display: flex; /* Establishes a flex container */
flex-wrap: wrap; /* Allows items to wrap onto the next line */
gap: 90px; /* Provides space between items */
justify-content: flex-start; /* Aligns items to the start of the container */
}

</style>