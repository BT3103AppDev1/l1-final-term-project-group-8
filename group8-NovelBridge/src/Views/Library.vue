<template>
    <LayoutHeader />
    <!-- BookFilter component for filtering books -->
    <BookFilter :categories="categories" @apply-filter="applyFilter" />
    <!-- Display filtered books -->
    <div class="books-grid">
      <div class="book-card" v-for="book in filteredBooks" :key="book.id">
        <!-- Book card content -->
        <img :src="book.cover" :alt="book.title" class="book-cover" />
        <h3>{{ book.title }}</h3>
        <p>{{ book.author }}</p>
        <!-- ... other book details ... -->
      </div>
    </div>
    <router-view/>
  </template>
  
  <script>
  import LayoutHeader from '@/components/LayoutHeader.vue';
  import BookFilter from '@/components/BookFilter.vue'; // Make sure the path is correct
  import bookCover from '@/assets/bookcover.jpg';
  import firebaseApp from "@/firebase";
  import {getFirestore, doc, getDocs, collection} from "firebase/firestore"
  import { getAuth, signOut, onAuthStateChanged, FacebookAuthProvider } from "firebase/auth";
  
  export default {
    name: "Library",
    components: {
      LayoutHeader,
      BookFilter // Register the BookFilter component
    },
    data() {
  return {
    categories: ['All', 'Fantasy', 'Historical Fiction', 'Science Fiction', 'Mystery', 'Thriller', 'Horror', 'Adventure', 'Contemporary'],
    allBooks: [],
    filteredBooks: []
    }},
    mounted(){
      this.fetchBooks();
    },
    methods: {
      async fetchBooks() {
        const db = getFirestore(firebaseApp)
        const queryBooks = await getDocs(collection(db, "Book"));
        //console.log("fetched",queryBooks.docs)
        this.allBooks = queryBooks.docs.map(doc => {
          const docData = doc.data();
          return { 
            id: docData.ID,
            title: doc.id,
            author:docData.Author,
            categories:docData.Category,          
          };
        });
        this.filteredBooks = this.allBooks;
        },

      applyFilter(filterData) {
        const { type, value } = filterData;
        if (type === 'category') {
          this.filteredBooks = value === 'All' ?
            this.allBooks :
            this.allBooks.filter(book => book.categories.includes(value));
        }
        // Handle other filter types (reader, wordCount) similarly
      },
    },
    /*created() {
      // Assuming allBooks would be fetched from an API or similar
      this.filteredBooks = this.allBooks;
    },*/
  };
  </script>
  
  <style scoped>
 .category-bar {
  display: flex;
  justify-content: center; /* Center the category bar */
  flex-wrap: wrap; /* Wrap items to the next line if needed */
  gap: 1rem; /* Adjust the gap as needed */
  padding: 1rem 0;
}

.category-bar button {
  padding: 0.5rem 1rem; /* Add padding to the buttons */
  background-color: transparent;
  border: 1px solid #ccc; /* Add border to the buttons */
  border-radius: 20px; /* Rounded corners for the buttons */
  color: #333; /* Set text color */
  font-size: 1rem; /* Adjust font size as needed */
}

.category-bar button:hover {
  background-color: #f0f0f0; /* Change background color on hover */
}

.category-bar button.active {
  background-color: #EC9006; /* Active button background color */
  color: white; /* Active button text color */
  border-color: #EC9006; /* Active button border color */
}

/* Styles for the books grid */
.books-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* Center the books grid */
  gap: 2rem; /* Adjust the gap as needed */
}

.book-cover {
    width: 150px; /* Adjust width as needed */
    display: flex;
    flex-direction: row; /* Align items in a row */
    align-items: center; /* Center items vertically */
    background-color: #fff;
    padding: 10px;
    border-radius: 10px; /* Optional: if you want rounded corners */
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
    }

  </style>
  