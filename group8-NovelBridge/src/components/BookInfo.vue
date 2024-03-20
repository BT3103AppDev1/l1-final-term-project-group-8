<template>
    <div>
      <h2>{{ book.title }}</h2>
      <p>Author: {{ book.author }}</p>
      <p>Genre: {{ book.genre }}</p>
      <p>Pages {{ book.pages }}</p>
      <p>Views {{ book.views }}</p>
      <p>{{ book.description }}</p>

      <!-- Display other book information here -->
    </div>
  </template>
  
<script>
  export default {
    props: ['book']
  };
</script>
  
  <style scoped>
  /* Add your CSS styles here */
  </style>
  