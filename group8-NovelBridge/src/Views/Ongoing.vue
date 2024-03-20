<template>
    <div>
        <header-component></header-component>
        <div class = "ongoing-section" v-if="!loading">
            <h2>Ongoing</h2>
            <book-list :books = "ongoingBooks"></book-list>
        </div>
        <p v-else>Loading books...</p>
    </div>
</template>
<script>
import header-component from './Header.vue';
import BookList from './BookList.vue';
import { db } from '@/firebase';
export default {
    name: 'Ongoing',
    components: {
        'header-component': header-component,
        'book-list': BookList

    },
    data() {
        return {
            ongoingBooks: [],
            loading: true,
        };
    },
    created() {
        this.fetchOngoingBooks();
    },
    methods: {
        async fetchOngoingBooks() {
            try {
                const userDoc = await db.collection('User').doc('testUser').get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          const allBooks = userData.bookmarked || [];
          this.unreadBooks = allBooks.filter(book => book.value === 1);
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
