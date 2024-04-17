<template>
  <LayoutHeader></LayoutHeader>
  <div class="book-detail">
    <div class="book-container">
      <img :src="book.cover" alt="bookcover" class="book-cover" />
      <div class="book-info">
        <h2>{{ book.title }}</h2>
        <p>Author: {{ book.author }}</p>
        <span class="genre-badge">{{ book.category}}</span>
      
      <div class="book-stats">
        <span class="page-count"><span class="highlighted-number">{{ book.wordCount }}</span> <span class="text-label">words</span></span> |
        <span><span class="highlighted-number">{{ book.views }}K</span> <span class="text-label">views</span></span>
      </div>
    </div>
    </div>


    <div class="actions">
      <button @click="readBook(book.chapters[0])" class="read-btn">Read</button>
      <button @click="toggleBookmark" class="bookmark-btn">{{ book.isBookmarked ? 'Added' : 'Add to Bookmark' }}</button>
      <button @click="toggleFavourite" class="favourite-btn">
        <div v-if="isFavourite">
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
    <h3>CONTENT - {{ book.chapters }} Chapters</h3><hr>
    <div class="chapters-row">
      <div v-for="(chapter, index) in book.chapters" :key="index" class="chapter-title">
        {{ chapter.title }}
      </div>
    </div>
  </div>
</div>


</template>

<script>
import firebaseApp from "@/firebase";
import {getFirestore, doc, getDoc, collection} from "firebase/firestore";
import LayoutHeader from '@/components/LayoutHeader.vue';

export default {
  data() {
    return {
      book: {
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
  async mounted() {
    const db = getFirestore(firebaseApp);
    const bookId = this.$route.params.id;
    console.log(bookId);
    const docInfo = doc(db, "Books", bookId);
    const queryBook = await getDoc(docInfo)
    
    if(queryBook.exists()) {
      const bookDetails = queryBook.data()
      this.book.title = bookDetails.Title;
      this.book.author = bookDetails.Author;
      this.book.category = bookDetails.Category;
      this.book.wordCount = bookDetails["Word Count"]
      this.book.views = bookDetails.Clicks;
      this.book.chapters = bookDetails.Chapters;
      this.book.cover = bookDetails.Cover;
      this.book.Chapter_Content = bookDetails.Chapter_Content;

      }
    else {
      console.error("Error in fetching books")
    }
    },

  methods: {
    toggleBookmark() {
      this.book.isBookmarked = !this.book.isBookmarked;
      const bookId = this.$route.params.id;
      // Further bookmark logic goes here
    },
    toggleFavourite() {
      this.book.isFavourite = !this.book.isFavourite;
      // Further favourite logic goes here
    },
    readBook(chapter) {
    // Assuming `chapter` is the first chapter identifier passed when calling this method
    this.$router.push({
      name: 'ReadingPanel',
      params: {
        name: this.book.name, // Replace this with the actual book name or ID as needed
        chapter: chapter
      }
    });
  },
    
  }
};
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

.book-detail {
  
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
.about-content {
background: #efe4d6; 
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