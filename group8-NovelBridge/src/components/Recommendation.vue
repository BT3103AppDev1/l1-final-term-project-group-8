<template>
    <div class="recommendation-section"> Recommendation </div>
      <div class="book-list">
        <div v-for="(book, index) in books" :key="index" class="book-item">
          <img :src="book.cover" :alt="book.title" class="book-cover" />
          <div class="book-title">{{ book.title }}</div>
          <div class="book-author">{{ book.author }}</div>
        </div>
      </div>
  </template>
  
  <script>
  export default {
    name: 'Recommendation',
    props: {
        books: Array
    },
  }
  </script>
  
  <style scoped>
  .recommendation-section {
    margin-top: 1%;
    margin-left: 2%;
    font-size: 19px;
    font-weight: bolder;
  /* Rest of your styling */
  }
  
  .book-list {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    /* Additional styling */
  }
  
  .book-item {
    width: 150px;
    margin: 0.5rem;
    /* Additional styling */
  }
  
  .book-cover {
    width: 100%;
    height: auto;
    /* Additional styling */
  }
  
  /*.book-title {
    /* Styling for the book title 
  }*/
  
  /*.book-author {
    /* Styling for the book author 
  }*/
  </style>
  