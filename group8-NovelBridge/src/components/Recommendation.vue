<template>
  <div class="recommendation-section">Recommendation</div>
  <div class="book-list">
    <div v-for="book in displayedBooks" :key="book.id" class="book-item">
      <router-link :to="{ name: 'BookDetail', params: { id: book.id }}">
        <img :src="book.cover" :alt="book.title" class="book-cover" />
      </router-link>
      <router-link :to="{ name: 'BookDetail', params: { id: book.id }}" class="book-name">
        {{ book.title }}
      </router-link>
      <div class="book-author">{{ book.author }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Recommendation',
  props: {
    books: Array,
  },
  computed: {
    // Only display up to 8 books
    displayedBooks() {
      return this.books.slice(0, 8);
    },
  },
};
</script>

<style scoped>
.recommendation-section {
  margin-top: 1%;
  margin-left: 5%;
  font-size: 19px;
  font-weight: bolder;
  /* Rest of your styling */
}

.book-list {
  display: flex;
  flex-wrap: wrap; /* Allow items to wrap to the next row */
  justify-content: space-around;
  padding: 1rem;
  max-width: 960px; /* Adjusted for 4 items per row */
  margin: auto; /* Center the book list */
  /* Additional styling */
  
}

.book-item {
  width: 150px;
  margin: 0.5rem;
  flex: 1 0 21%; /* Adjusted for 4 items per row, accounting for margins */
  /* Additional styling */
  transition: transform 0.3s ease
}

.book-item:hover {
  transform: translateY(-5px); /* Slight lift effect on hover */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3); /* Soft shadow for depth */
}

.book-name {
  text-decoration: none;
  color:black;
  font-weight: bold;

  
}

.book-name:hover{
  text-decoration: underline;
}

.book-author {
  font-size: 13px;
  color:grey;
  font-weight:lighter;
}

.book-cover {
  width: 100%; /* Make the image responsive within the container */
  height: auto; /* Adjust height automatically */
  object-fit: cover;
  border-radius: 5%;
  /* Additional styling */
}

/* .book-title and .book-author styling can be added here */
</style>
