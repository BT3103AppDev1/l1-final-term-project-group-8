<template>
    <div class="book-detail">
      <div class="book-container">
        <img :src="bookcover" alt="book.title + ' cover'" class="book-cover" />
        <div class="book-info">
          <h2>{{ book.title }}</h2>
          <p>Author: {{ book.author }}</p>
          <span class="genre-badge">{{ book.genre }}</span>
        
        <div class="book-stats">
          <span class="page-count"><span class="highlighted-number">{{ book.pages }}</span> <span class="text-label">pages</span></span> |
          <span><span class="highlighted-number">{{ book.views }}K</span> <span class="text-label">views</span></span>
        </div>
      </div>
      </div>


      <div class="actions">
        <button @click="readBook" class="read-btn">Read</button>
        <button @click="toggleBookmark" class="bookmark-btn">{{ book.isBookmarked ? 'Added' : 'Add to Bookmark' }}</button>
        <button @click="toggleFavourite" class="favourite-btn">
          <img :src="book.isFavourite ? '@/assets/heart-filled.jpg' : '@/assets/heart-unfilled.jpg'" alt="Favourite icon" class="heart-icon" />
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
      <div class="chapters-row">
        <div v-for="(chapter, index) in book.chapters" :key="index" class="chapter-title">
          {{ chapter.title }}
        </div>
      </div>
    </div>
  </div>


  </template>
  
  <script>
  export default {
    props: {
      book: {
        type: Object,
        required: true
      }
    },
    methods: {
      toggleBookmark() {
        this.book.isBookmarked = !this.book.isBookmarked;
        // Further bookmark logic goes here
      },
      toggleFavourite() {
        this.book.isFavourite = !this.book.isFavourite;
        // Further favourite logic goes here
      },
      readBook() {
        // Read book logic goes here
      }
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
    /* Styles for the action buttons */
  }

  .read-btn {
    background-color: orange; /* Set the background color to orange */
    /* Add any other styling you need for the button, such as padding, border, etc. */
    padding: 5px 20px; /* Example padding */
    border: none; /* Remove border */
    border-radius: 5px; /* Optional: Adds rounded corners to the button */
    margin-right: 10px;
}

.bookmark-btn {
  background-color: white;
  padding: 5px 20px; /* Adjust the padding to change the size */
  border-radius: 5px; /* Example border radius */
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