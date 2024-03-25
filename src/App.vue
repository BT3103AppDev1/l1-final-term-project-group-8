<template>
  <LayoutHeader></LayoutHeader>
  <MovingBanner></MovingBanner>


  <div class="main-content">
    <section class="recommendation-section">
      <h2>Recommendation</h2>
      <Recommendation :books="limitedBooks"></Recommendation>
    </section>

    <section class="top-10-books-section">
      <Top10Books :books="books"></Top10Books>
    </section>
  </div>
</template>

<script setup>
import LayoutHeader from './components/LayoutHeader.vue'
import MovingBanner from './components/MovingBanner.vue'
import Top10Books from './components/Top10Books.vue'
import Recommendation from './components/Recommendation.vue'
import bookCover from '@/assets/bookcover.jpg'

const books = [
  {
    id: 1,
    title: 'The Kamogawa Food Detectives',
    author: 'Hishashi Kashiwai',
    category: 'Mystery',
    pages: '159',
    cover: bookCover
  },
  {
    id: 1,
    title: 'The Kamogawa Food Detectives',
    author: 'Hishashi Kashiwai',
    category: 'Mystery',
    pages: '159',
    cover: bookCover
  },
  
  {
    id: 2,
    title: 'Icebreaker',
    author: 'Hannah Grace',
    category: 'Romance, Contemporary', 
    pages:'424',
    cover: bookCover
  },
  {
    id: 2,
    title: 'Icebreaker',
    author: 'Hannah Grace',
    category: 'Romance, Contemporary',
    pages:'424',
    cover: bookCover
  },
  
  
];

const limitedBooks = books.slice(0, 7);

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
