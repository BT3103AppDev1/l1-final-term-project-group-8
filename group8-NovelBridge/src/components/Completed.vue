<template>
    <Bookmarked/>
      <!-- Display book cards -->
      <section class="book-section">
        <div class="book-list">
          <!-- Iterate over the books array and render book cards -->
          <div class="book-card" v-for="book in books" :key="book.id">
            <img :src="book.cover" :alt="book.title" class="book-cover">
            <h3 class="book-title">{{ book.title }}</h3>
          </div>
        </div>
      </section>
  </template>

  <script>
  import Bookmarked from '@/Views/BookMarked.vue';
  import bookCover from '@/assets/bookcover.jpg';
  
  export default {
    name: 'Completed',
    components: {
      Bookmarked
    },
    data() {
      return {
        // Define the books array
        books: [
          {
            id: 1,
            title: 'The Kamogawa Food Detectives-complete',
            cover: bookCover,
          },
          {
            id: 2,
            title: 'Icebreaker-complete',
            cover: bookCover,
          },
          // Add more books as needed
        ],
      };
    },
  };
  </script>

  <style scoped>
  .main-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center; /* Center content vertically */
    height: 100vh; /* Make the main content fill the viewport height */
    background-color: white;
  }
  
  .book-section {
    flex: 1; /* Allow the book section to occupy remaining vertical space */
    display: flex;
    flex-direction: column;
  }
  
  .title {
    color: black; /* Set the title color to black */
  }
  
  .book-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    width: 100%; /* Make the book list occupy the full width */
    padding: 20px; /* Add padding for better spacing */
    box-sizing: border-box; /* Ensure padding is included in the width */
  }
  
  .book-card {
    width: 300px;
    display: flex;
    flex-direction: column; /* Change direction to column */
    align-items: center; /* Align items in the center */
    background-color: #fff;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
  }
  
  .book-cover {
    width: 100px;
    height: 150px;
    margin-bottom: 10px; /* Add margin below the cover */
  }
  
  .book-title {
    color: black; /* Set text color to black */
    margin: 0; /* Reset margin */
  }
  </style>