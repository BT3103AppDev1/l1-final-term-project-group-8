<template>
  <LayoutHeader></LayoutHeader>
  <MovingBanner></MovingBanner>
  <div class="main-content">
    <section class="recommendation-section">
      <Recommendation :books="filteredBooks"></Recommendation>
    </section>
    <section class="top-10-books-section">
      <Top10Books :books="filteredBooks"></Top10Books>
    </section>
  </div>
  <Footer></Footer>
</template>

<script>
import LayoutHeader from '@/components/LayoutHeader.vue';
import MovingBanner from '@/components/MovingBanner.vue';
import Top10Books from '@/components/Top10Books.vue';
import Recommendation from '@/components/Recommendation.vue';
import {getFirestore, doc, getDocs, collection} from "firebase/firestore"
import firebaseApp from "@/firebase";
import Footer from '@/components/Footer.vue';

export default {
  name: "Library",
  components: {
    LayoutHeader,
    MovingBanner,
    Top10Books,
    Recommendation,
    Footer
  },
  data() {
    return {
      allBooks: [],
      filteredBooks: []
    };
  },
  mounted() {
    this.fetchBooks();
  },
  methods: {
    async fetchBooks() {
      try {
        const db = getFirestore(firebaseApp);
        const querySnapshot = await getDocs(collection(db, "Books"));
        this.allBooks = querySnapshot.docs.map(doc => ({
          id: doc.id,
          title: doc.data().Title,
          author: doc.data().Author || 'Unknown',
          categories: doc.data().Category || [],
          cover: doc.data().Cover || '',
          wordCount: doc.data()['Word Count'] || 0,
          gender: doc.data().Gender || 'No gender',
          views: doc.data().Clicks || 0
        }));
        this.filteredBooks = this.allBooks;
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    },
    applyFilter(type, value) {
      switch (type) {
        case 'category':
          this.filteredBooks = value === 'All' ?
            this.allBooks :
            this.allBooks.filter(book => book.categories && book.categories.includes(value));
          break;
        case 'wordCount':
          break;
        case 'gender':
          this.filteredBooks = value === 'All' ?
            this.allBooks :
            this.allBooks.filter(book => book.gender && book.gender.toLowerCase() === value.toLowerCase());
          break;
        case 'Number of Views':
          if (value === 'Top 8') {
            this.filteredBooks = [...this.allBooks]
              .sort((a, b) => b.views - a.views)
              .slice(0, 8);
          } else {
            this.filteredBooks = this.allBooks;
          }
          break;
        default:
          this.filteredBooks = this.allBooks;
      }
    }
  }
}
</script>

<style scoped>
.main-content {
  display: flex;
}

.recommendation-section, .top-10-books-section {
  flex: 1;
}

.recommendation-section {
  margin-right: 20px;
}
</style>
