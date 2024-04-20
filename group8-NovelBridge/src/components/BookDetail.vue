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
      <button @click="toggleBookmark" class="bookmark-btn">
        {{ book.isBookmarked ? 'Added' : 'Add to Bookmark' }}
      </button>

      <button @click="toggleFavourite" class="favourite-btn">
        <img v-if="book.isFavourite" src="@/assets/heart-filled.jpg" 
          alt="Favourite icon" class="heart-icon">
        <img v-else src="@/assets/heart-unfilled.jpg" 
         alt="Favourite icon" class="heart-icon">
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
        <li v-for="(chapter, index) in book.chapters" :key="index" @click="startReadingChapter(index + 1)" class="chapter-item">
          {{ chapter }}
        </li>
      </ul>


    </div>
  </div>
</template>

<script>
import firebaseApp from "@/firebase";
import {getFirestore, doc, getDoc, collection, updateDoc,arrayUnion, arrayRemove } from "firebase/firestore";
import LayoutHeader from '@/components/LayoutHeader.vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";


export default {
  components: {
    LayoutHeader,
    // ... any other components
  },
  props: {
    id: String
  },
  created() {
  // Immediately invoked async function inside the created hook
    (async () => {
      const auth = getAuth(firebaseApp);
      if (auth.currentUser) {
        this.userID = auth.currentUser.uid;
        // Assuming checkIfBookmarked is a method that checks bookmark status
        this.book.isBookmarked = await this.checkIfBookmarked(this.book.id);
      } else {
        console.error("No user logged in!")
      }
      onAuthStateChanged(auth, user => {
        if (user) {
          this.userID = user.uid;
          console.log(user.uid);
        } else {
          console.error("No user logged in!");
          
        }
      });
    })();
  },

  async mounted() {
    const db = getFirestore(firebaseApp);
    const bookId = this.$route.params.id;
    this.book.id = bookId;

    // Fetch book details
    const bookDocRef = doc(db, "Books", bookId);
    const bookDocSnap = await getDoc(bookDocRef);

    if (bookDocSnap.exists()) {
        const bookDetails = bookDocSnap.data();
        this.book.title = bookDetails.Title;
        this.book.author = bookDetails.Author;
        this.book.category = bookDetails.Category.join(', ');
        this.book.wordCount = bookDetails["Word Count"];
        this.book.views = bookDetails.Clicks;
        this.book.cover = bookDetails.Cover;
        this.book.description = bookDetails.Description;
        this.book.chapters = Array.from({ length: bookDetails.Chapters }, (_, i) => `Chapter ${i + 1}`);
    } else {
        console.error("Error fetching book details.");
    }

    // Fetch user data and check bookmark status
    if (this.userID) {
        const userDocRef = doc(db, "users", this.userID);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
            const userData = userDocSnap.data();
            const { Unread, Ongoing, Completed, Favourite } = userData;
            this.book.isBookmarked = [Unread, Ongoing, Completed].some(list => list.includes(bookId));
            this.book.isFavourite = Favourite.includes(bookId);
        } else {
            console.error("Error fetching user details.");
        }
    }
  },

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
        }
    }
  },


  methods: {
    async checkIfBookmarked(bookId) {
      const db = getFirestore(firebaseApp);
      const userDocRef = doc(db, "users", this.userID);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const { Completed, Ongoing, Unread } = userData;
        return Completed.includes(bookId) || Ongoing.includes(bookId) || Unread.includes(bookId);
      } else {
        console.error('User document does not exist');
        return false;
      }
    },
    
    async checkIfFavourite(bookId) {
      const db = getFirestore(firebaseApp);
      const userDocRef = doc(db, "users", this.userID);
      const userDocSnap = await getDoc(userDocRef);
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        const {Favourite} = userData;
        return Favourite.includes(bookId);
      } else {
        console.error('User document does not exist');
        return false;
      }
    },

    async readBook() {
    const db = getFirestore(firebaseApp);
    const bookId = this.book.id; // Assuming this.book.id is already set
    const userId = this.userID;
    const userDocRef = doc(db, "users", userId);
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      let { Unread, Ongoing, Progress } = userData;
      // Determine the chapter to start reading from
      let chapterToStart = Progress && Progress[bookId] ? Progress[bookId] : 1;
      // Update Progress with the starting chapter
      const newProgress = { ...Progress, [bookId]: chapterToStart };
      await updateDoc(userDocRef, {
        Progress: newProgress
      });
      console.log(`Progress updated to start at chapter ${chapterToStart} for bookId ${bookId}.`);
      // Add to Ongoing if not already included
      if (!Ongoing.includes(bookId) && Unread.includes(bookId)) {
        await updateDoc(userDocRef, {
          Ongoing: arrayUnion(bookId), Unread: arrayRemove(bookId)
        });
        console.log(`Book ID ${bookId} added to Ongoing.`);
      }
      this.$router.push({
          name: 'ReadingPanel',
          params: {
            name: this.book.title,
            chapter: chapterToStart,
            bookId: this.book.id,
            userId: this.userID
          }
        });
      } else {
        console.error("Error in fetching user data");
      }
      
    },
  

    async startReadingChapter(chapterNumber) {
      const db = getFirestore(firebaseApp);
      const bookId = this.$route.params.id;
      const userId = this.userID;
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        let { Unread, Ongoing, Progress } = userData;

        // Update Progress with the selected chapter
        const newProgress = {...Progress, [bookId]: chapterNumber};
        await updateDoc(userDocRef, {
          Progress: newProgress
        });
        console.log(`Progress updated to chapter ${chapterNumber} for bookId ${bookId}.`);

        // Add to Ongoing if not already included
        if (!Ongoing.includes(bookId)) {
          await updateDoc(userDocRef, {
            Ongoing: arrayUnion(bookId)
          });
          console.log(`Book ID ${bookId} added to Ongoing.`);
        }

        // Navigate to the ReadingPanel with the selected chapter
        this.$router.push({
          name: 'ReadingPanel',
          params: {
            name: this.book.title,
            chapter: chapterNumber,
            bookId: this.book.id,
            userId: this.userID,
          }
        });
      } else {
        console.error("Error in fetching user data");
      }
      
    },

    async toggleBookmark() {

      console.log('toggleBookmark called');
      const db = getFirestore(firebaseApp);
      const bookId = this.book.id; // Assuming this.book.id is already set
      const userId = this.userID;
      console.log(userId);
      if (!userId) {
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
        this.book.isBookmarked = Completed.includes(bookId) ||
                                Ongoing.includes(bookId) ||
                                Unread.includes(bookId);
        console.log(this.book.isBookmarked);

        if (!this.book.isBookmarked) {
          // If not bookmarked, determine where to add
          const bookProgress = Progress[bookId] || 0;
          const updates = bookProgress === 0 ? { Unread: arrayUnion(bookId) } : { Ongoing: arrayUnion(bookId) };

          // Perform the update
          await updateDoc(userDocRef, updates);
          this.book.isBookmarked = true;
        } else {
          // If bookmarked, remove from all arrays
          await updateDoc(userDocRef, {
            Unread: arrayRemove(bookId),
            Ongoing: arrayRemove(bookId),
            Completed: arrayRemove(bookId)
          });
          console.log('removed');
          this.book.isBookmarked = false;
        }
        // Refresh the bookmark status
        this.book.isBookmarked = await this.checkIfBookmarked(bookId);
      } else {
        console.error('User document does not exist');
      }
    }
    },

    async toggleFavourite() {
      console.log('toggleFavourite called');
      const db = getFirestore(firebaseApp);
      const bookId = this.book.id; // Assuming this.book.id is already set
      const userId = this.userID;
      if (!userId) {
        this.$router.push({ 
          name: 'Bookmarked',
        })
        console.log("directed to bookmarked")
      } 
      const userDocRef = doc(db, "users", userId);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        const userData = userDocSnap.data();
        let { Favourite } = userData;

        // Toggle the favourite status
        if (!Favourite.includes(bookId)) {
          // If it's not already a favourite, add it to the favourites
          await updateDoc(userDocRef, {
            Favourite: arrayUnion(bookId)
          });
          this.book.isFavourite = true;
        } else {
          // If it is already a favourite, remove it from the favourites
          await updateDoc(userDocRef, {
            Favourite: arrayRemove(bookId)
          });
          this.book.isFavourite = false;
        }
        console.log(this.book.isFavourite ? 'added to favourites' : 'removed from favourites');
      } else {
        console.error('User document does not exist');
      }
    },
  }
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
    background-color: rgba(244, 222, 184, 0.769);
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}

.bookmark-btn {
  background-color: white;  
  border-color: darkgray;
  margin-right: 10px;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
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
  margin-top: 5px;
  width: 24px; /* Adjust the size of the heart icon */
  height: 35px;
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

.chapter-item {
  cursor: pointer;
  padding: 5px 0; /* Existing styles */
  /* Additional hover styles */
}

.chapter-item:hover {
  background-color: #f0f0f0; /* A light grey background on hover */
}

</style>