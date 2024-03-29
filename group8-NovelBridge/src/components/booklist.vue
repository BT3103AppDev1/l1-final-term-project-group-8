<template>
    <div class="library">
      <div class="book-list">
        <div class="book-card" v-for="book in booklist" :key="book.id">
          <img :src="book.cover" alt="Book cover" class="book-cover">
          <div class="book-details">
            <h2 class="book-title">{{ book.title }}</h2>
            <p class="book-author">Author: {{ book.author }}</p>
            <p class="book-category">Category: {{ book.category }}</p>
            <p class="book-pages">{{ book.pages }} Pages</p>
            <p class="book-preview">preview </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name:'booklist',
    props: {
      books:Array
    }
  }

  </script>
  
  <style scoped>
  .library {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 20px;
  }
  
  .book-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
  }
  
  .book-card {
    width: 300px; /* Adjust width as needed */
    display: flex;
    flex-direction: row; /* Align items in a row */
    align-items: center; /* Center items vertically */
    background-color: #fff;
    padding: 10px;
    border-radius: 10px; /* Optional: if you want rounded corners */
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }
  
    .book-cover {
    width: 100px; /* Adjust size as needed */
    height: 150px; /* Keep the aspect ratio */
    margin-right: 20px; /* Space between cover and text */
    }
  
  .book-details {
    flex: 1;
  }

  
  .book-author,
  .book-category,
  .book-pages {
    font-size: 14px;
    color: #666;
    margin: 2px 0; /* Reduce space between these elements */
  }
        
  .book-preview {
    font-size: 14px;
    color: #666;
    margin-top: 10px; /* More space before the preview text */
    display: block; /* Ensure it takes its own line */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    }
  </style>
  ./BookList.vue