<template>
    <div>
        <layout-header></layout-header>
        <div class = "unread-section" v-if="!loading">
            <h2>Unread</h2>
            <book-list :books = "unreadBooks"></book-list>
        </div>
        <p v-else>Loading books...</p>
    </div>
</template>
<script>
import LayoutHeader from './LayoutHeader.vue';
import BookList from './BookList.vue';
import { db } from '@/firebase';
export default {
    name: 'Unread',
    components: {
        'layout-header': LayoutHeader,
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
