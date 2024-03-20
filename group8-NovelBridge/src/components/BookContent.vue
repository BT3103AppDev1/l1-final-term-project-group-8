<template>
    <div>
      <BookInfo :book="book" />
      <ActionButton @startToRead="startToRead" @addToBookmark="addToBookmark" @addToFavourite="addToFavourite" />
    </div>
  </template>
  
<script>
  import BookInfo from './BookInfo.vue';
  import ActionButton from './ActionButton.vue';
  
  export default {
    components: {
      BookInfo,
      ActionButton
    },
    data() {
      return {
        book: {
          title: 'Book Title',
          author: 'Author Name',
          description: 'Book Description',
          genre: 'Genre',
          pages: 'Total Page Number',
          views: 'Total views'
          // Add other book information here
        }
      };
    },
    methods: {
      startToRead() {
        // Logic for starting to read the book
      },
      addToBookmark() {
        // Logic for adding the book to bookmarks
      },
      addToFavourite() {
        // Logic for adding the book to favourites
      }
    }
  };
</script>
  
  <style>
  /* Add your component-specific CSS styles here */
  </style>
  