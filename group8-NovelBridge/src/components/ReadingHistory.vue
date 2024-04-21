<template>
        <LayoutHeader />
    <!-- Display book cards -->
    <section class="book-section">
      <div class="book-list">
        <!-- Iterate over the books array and render book cards -->
        <div class="book-card" v-for="book in progressBooks" :key="book.id">
          <router-link :to="{ name: 'BookDetail', params: { id: book.id }}">
            <img :src="book.cover" :alt="book.title" class="book-cover" />
          </router-link>
          <router-link :to="{ name: 'BookDetail', params: { id: book.id }}" class="book-title">
            {{ book.title }}
          </router-link>
        </div>
      </div>
    </section>
</template>

<script>
import LayoutHeader from '../components/LayoutHeader.vue'
import { defineComponent, ref } from 'vue';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, getDoc, collection, query, where, getDocs, documentId } from "firebase/firestore";
import firebaseApp from "@/firebase";
import Bookmarked from '@/Views/BookMarked.vue';
  
  export default defineComponent({
    name: 'readingHistory',
    components: {
      LayoutHeader
    },
    setup() {
      const progressBooks = ref([]);
      const fetchprogressBooks = async (userId) => {
  const db = getFirestore(firebaseApp);
  const userDocRef = doc(db, "users", userId);
  try {
    const userDocSnap = await getDoc(userDocRef);
    if (userDocSnap.exists()) {
      const progressData = userDocSnap.data().Progress || {};
      console.log("Progress data:", progressData);
      const booksCollectionRef = collection(db, "Books");

      // Empty the array first to ensure reactivity
      progressBooks.value = [];
      
      for (const bookId of Object.keys(progressData)) {
        const bookDocRef = doc(booksCollectionRef, bookId);
        const bookDocSnap = await getDoc(bookDocRef);
        if (bookDocSnap.exists()) {
          const data = bookDocSnap.data();
          progressBooks.value.push({
            id: bookId,
            title: data.Title,
            author: data.Author || 'Unknown',
            categories: data.Category || [],
            cover: data.Cover || '',
            wordCount: data['Word Count'] || 0,
            views: data.Clicks || 0,
            progress: progressData[bookId]
          });
        } else {
          console.log(`No such book for ID: ${bookId}`);
        }
      }
    } else {
      console.log("User document not found");
    }
  } catch (error) {
    console.error("Error fetching progress books:", error);
  }
};


      const auth = getAuth(firebaseApp);
      onAuthStateChanged(auth, user => {
        if (user) {
          fetchprogressBooks(user.uid);
        }
      });
      return {
        progressBooks
      };
    },
  });

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

.book-title {
    color: black; 
    text-decoration: none;
  }

  .book-title:hover {
    text-decoration: underline;
  }
</style>