<template>
    <LayoutHeader />
    <!-- BookFilter component for filtering books -->
    <BookFilter :categories="categories" @apply-filter="applyFilter" />
    <!-- Display filtered books -->
    <div class="books-grid">
      <div class="book-card" v-for="book in filteredBooks" :key="book.id">
        <!-- Book card content -->
        <router-link :to="{ name: 'BookDetail', params: { id: book.id }}"><img :src="book.cover" :alt="book.title" class="book-cover" /></router-link>
        <router-link :to="{ name: 'BookDetail', params: { id: book.id }}"><h3>{{ book.title }}</h3></router-link>
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
    props: {
    category: String, // Add this if you need to pass 'category' as a prop
    },

    data() {
      return {
      categories: ['All', 'Fantasy', 'Historical Fiction', 'Science Fiction', 'Mystery', 'Thriller', 'Horror', 'Adventure', 'Contemporary'],
      allBooks: [],
      filteredBooks: []
    }},
    mounted(){
      this.fetchBooks().then(() => {
        const categoryFromRoute = this.$route.query.category;
        if (categoryFromRoute) {
          this.applyFilter({ type: 'category', value: categoryFromRoute });
        }
      });
    },
    methods: {
      async fetchBooks() {
        const db = getFirestore(firebaseApp)
        const queryBooks = await getDocs(collection(db, "Books"));
        //console.log("fetched",queryBooks.docs)
        this.allBooks = queryBooks.docs.map(doc => {
          const docData = doc.data();
          console.log("Data fetched", docData)
          return { 
            id: doc.id,
            title: docData.Title,
            author:docData.Author,
            categories:docData.Category,
            cover:docData.Cover,
            wordcount: docData['Word Count'],
            gender: docData.Gender          
          };
        });
        this.filteredBooks = this.allBooks;
        },

      applyFilter(filterData) {
    const { type, value } = filterData;
    switch (type) {
      case 'category':
        this.filteredBooks = value === 'All' ?
          this.allBooks :
          this.allBooks.filter(book => book.categories.includes(value));
        break;
      case 'wordCount':
        this.filteredBooks = this.filterByWordCount(value);
        break;
      case 'gender':
        this.filteredBooks = value === 'All' ?
          this.allBooks :
          this.allBooks.filter(book => book.gender.toLowerCase() === value.toLowerCase());
        break;
      // ... handle other filters ...
    }
  },

  filterByWordCount(wordCountRange) {
    const [min, max] = this.parseWordCountRange(wordCountRange);
    return this.allBooks.filter(book => {
      const wordCount = parseInt(book.wordcount, 10);
      return wordCount >= min && wordCount <= max;
    });
  },

  parseWordCountRange(wordCountRange) {
    switch (wordCountRange) {
      case 'Below 30k':
        return [0, 30000];
      case '30k - 50k':
        return [30000, 50000];
      case '50k - 1million':
        return [50000, 1000000];
      case 'Above 1million':
        return [1000000, Infinity];
      default:
        return [0, Infinity];
    }
  },
},
  }
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
  