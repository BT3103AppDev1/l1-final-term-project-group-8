<template>
    <div>
        <header-component></header-component>
        <div class = "unread-section" v-if="!loading">
            <h2>Unread</h2>
            <book-list :books = "unreadBooks"></book-list>
        </div>
        <p v-else>Loading books...</p>
    </div>
</template>
<script>
import header-component from './Header.vue';
import BookList from './BookList.vue';
import { db } from '@/firebase';
export default {
    name: 'Unread',
    components: {
        'header-component': header-component,
        'book-list': BookList

    },
    data() {
        return {
            unreadBooks: [],
            loading: true,
        };
    },
    created() {
        this.fetchUnreadBooks();
    },
    methods: {
        async fetchUnreadBooks() {
            try {
                const userDoc = await db.collection('User').doc('testUser').get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const allBooks = userData.bookmarked || []; 
          this.unreadBooks = allBooks.filter(book => book.value === 0);
        } else {
          console.log('No such document!');
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
      this.loading = false;
        }
    }
};
</script>
