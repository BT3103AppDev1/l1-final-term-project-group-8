<template>
    <div class="recommendation-container">
      <!-- Book on the left -->
      <div class="book-single">
        <BookComponent :book="books[0]" /> <!-- Assuming the first book is at index 0 -->
      </div>
      <!-- Two rows of three books on the right -->
      <div class="book-rows">
        <div class="book-row">
          <BookComponent v-for="book in books.slice(1, 4)" :key="book.id" :book="book" />
        </div>
        <div class="book-row">
          <BookComponent v-for="book in books.slice(4, 7)" :key="book.id" :book="book" />
        </div>
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
    /* Styling for the section */
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
  
  .book-title {
    /* Styling for the book title */
  }
  
  .book-author {
    /* Styling for the book author */
  }
  </style>
  