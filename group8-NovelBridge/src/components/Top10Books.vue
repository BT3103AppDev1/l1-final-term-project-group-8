<template>
    <div class="top-10-section">
        <div class="top-10-header">Top 10 Books to Read </div>
        <div class="category-sections">
            <div class="category1">
                <h4 @click="goToRomance" class="header">Romance</h4>
                <ol >
                    <li v-for="book in romanceBooks" :key="book.id">
                        <router-link :to="{ name: 'BookDetail', params: { id: book.id }}" class="book-title"> {{ book.title }}</router-link>
                    </li>
                </ol>
            </div>
            <div class="category2">
                <h4 @click="goToMystery" class = "header">Mystery</h4>
                <ol>
                    <li v-for="book in mysteryBooks" :key="book.id">
                        <router-link :to="{ name: 'BookDetail', params: { id: book.id }}" class="book-title"> {{ book.title }}</router-link>
                    </li>
                </ol>
            </div>
        </div>
    </div>
</template>

<script>
import firebaseApp from "@/firebase";
import {getFirestore, doc, getDocs, collection} from "firebase/firestore"

export default {
    name: "Top10Books",
    data() {
        return {
            books:[]
        }
    },
    mounted(){
      this.fetchBooks();
    },
    computed: {
        romanceBooks() {
            return this.books.filter(book => book.categories.includes("Romance")).slice(0, 10);
        },
        
        mysteryBooks(){
            return this.books.filter(book => book.categories.includes("Mystery")).slice(0, 10);
        }
    },
    methods: {
      async fetchBooks() {
        const db = getFirestore(firebaseApp)
        const queryBooks = await getDocs(collection(db, "Books"));
        console.log("fetched",queryBooks.docs)
        this.books = queryBooks.docs.map(doc => {
          const docData = doc.data();
          return { 
            id: doc.id,
            title: docData.Title || "Unknown",
            categories:docData.Category,          
          }; 
        });
    },
        
        goToRomance() {
            this.$router.push({ name: 'Library', query: { category: 'Romance' } });
        },

        goToMystery() {
            this.$router.push({ name: 'Library', query: { category: 'Mystery' } });
        }
    },
}
</script>

<style scoped>
.top-10-section {
    display:flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1%;
    margin-left: 13%;
    margin-right: 5%;
}
.top-10-header {
    font-size: 18px;
    color: #333; /* Change this to match your site's color scheme */
    margin-bottom: 5%;
    font-weight: bolder;
    
}
.category-sections {
  display: flex;
  justify-content: space-around;
  width:450px;
}

.category1 {
  flex: 1;
  margin: 0 8px;
  background:#fff url(https://i.imgur.com/r5CD2U0.png);
  box-shadow: 0 12px 67px 0 rgba(0,0,0,.04);
  padding: 16px;
  border-radius: 8px;
  list-style: none;
}

.category2 {
  flex: 1;
  margin: 0 8px;
  background:#fff url(https://i.imgur.com/FaNoH6x.png);
  box-shadow: 0 12px 67px 0 rgba(0,0,0,.04);
  padding: 16px;
  border-radius: 8px;
  list-style: none;
}

.header {
  text-align: center;
  padding: 8px;
  border-radius: 8px;
  font-size: 18px;
  margin-bottom: 8px;
  text-decoration: underline;
  font-weight:bold;
}

.category1 ol,
.category2 ol {
  padding-left: 20px;
  
}


.category1 ol li,
.category2 ol li,
.header{
  cursor: pointer; 
  margin-top: 4%;
}
/* Add hover effect for list items */
.category1 ol li:hover,
.category2 ol li:hover {
    text-decoration:underline;
}

.book-title{
    text-decoration: none;
    color:black;

}

</style>