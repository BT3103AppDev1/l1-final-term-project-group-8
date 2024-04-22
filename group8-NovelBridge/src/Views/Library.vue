<template>
    <LayoutHeader />
    <!-- BookFilter component for filtering books -->
    <div class="main-content">
    <BookFilter :categories="categories" @apply-filter="applyFilter" class="category-bar" />
    <!-- Display filtered books -->
    <div class="books-grid">
      <div class="book-card" v-for="book in filteredBooks" :key="book.id">
        <!-- Book card content -->
        <router-link :to="{ name: 'BookDetail', params: { id: book.id }}"><img :src="book.cover" :alt="book.title" class="book-cover" /></router-link>
        <div class="book-details">
        <router-link :to="{ name: 'BookDetail', params: { id: book.id }}" class="book-title"><h3>{{ book.title }}</h3></router-link>
        <p>Author: {{ book.author }}</p>
        <p>Word Count: {{ formatWordCount(book.wordcount) }}</p>
      </div>
        <!-- ... other book details ... -->
      </div>
    </div>
    <router-view/>
    </div>
    <Footer></Footer>
  </template>
  
  <script>
  import LayoutHeader from '@/components/LayoutHeader.vue';
  import BookFilter from '@/components/BookFilter.vue'; // Make sure the path is correct
  import bookCover from '@/assets/bookcover.jpg';
  import firebaseApp from "@/firebase";
  import {getFirestore, doc, getDocs, collection} from "firebase/firestore"
  import { getAuth, signOut, onAuthStateChanged, FacebookAuthProvider } from "firebase/auth";
  import Footer from '@/components/Footer.vue';

  export default {
    name: "Library",
    components: {
      LayoutHeader,
      BookFilter,
      Footer
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
          this.applyFilter({type: 'categories', value: categoryFromRoute});
        }
      });
    },
    methods: {
      async fetchBooks() {
        const db = getFirestore(firebaseApp)
        const queryBooks = await getDocs(collection(db, "Books"));
        this.allBooks = queryBooks.docs.map(doc => {
          const docData = doc.data();
          return { 
            id: doc.id,
            title: docData.Title,
            author:docData.Author,
            categories:docData.Category,
            cover:docData.Cover,
            wordcount: docData['Word Count'],
            gender: docData.Gender,
            views: docData['Number of Views']         
          };
        });
        this.filteredBooks = this.allBooks;
        },

      applyFilter(filterData) {
      const { type, value } = filterData;
      switch (type) {
        case 'categories':
          this.filteredBooks = value === 'All' ?
            this.allBooks :
            this.allBooks.filter(book => book.categories.includes(value));
          break;
        case 'wordCounts':
          this.filteredBooks = this.filterByWordCount(value);
          break;
        case 'gender':
          this.filteredBooks = value === 'All' ?
            this.allBooks :
            this.allBooks.filter(book => book.gender.toLowerCase() === value.toLowerCase());
          break;
        case 'numberOfViews': 
            this.filteredBooks = this.filterByNumberOfViews(value);
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

    formatWordCount(wordcount) {
      if (wordcount >= 1000000) {
        return (wordcount / 1000000).toFixed(1) + 'M';
      } else if (wordcount >= 1000) {
        return (wordcount / 1000).toFixed(1) + 'K';
      } else {
        return wordcount.toString();
      }
    },

    filterByNumberOfViews(viewRange) {
      const [min, max] = this.parseViewRange(viewRange);
      return this.allBooks.filter(book => {
        const views = parseInt(book.views, 10);
        return views >= min && views <= max;
      });
    },

    parseViewRange(viewRange) {
      switch (viewRange) {
        case 'Below 30k':
          return [0, 30];
        case '30k - 50k':
          return [30, 50];
        case '50k - 1million':
          return [50, 100];
        case 'Above 1million':
          return [100, Infinity];
        default:
          return [0, Infinity];
      }
    },
  },

    
}

    

  </script>
  
  <style scoped>

.main-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
 .category-bar {
  display: flex;
  justify-content: center; /* Center the category bar */
  flex-wrap: wrap; /* Wrap items to the next line if needed */
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
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* Creates a responsive grid */
  gap: 1rem;
}

.book-card {
  display: flex;
  align-items: flex-start;
  padding: 1rem;
  transition: transform 0.2s;
  max-width:90%;
  overflow: hidden;
  text-overflow: ellipsis;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-cover {
  width: 110px; /* Fixed width for the image */
  height: 150px;
  object-fit: cover;
  border-radius: 5%;
}

.book-details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-left: 1rem;
  flex: 1;
  min-width: 0;/* Allow book-details to take up the remaining space */
}

.book-title {
  display: block; 
  max-width:80%;
  text-decoration: none;
  color:black;
}

.book-title:hover{
  color:orange;
}

.book-title h3 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%; /* Make sure this is not larger than its container */
}

p{
  font-size: 13px;
  color:grey;
  font-weight:lighter;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

  </style>
  