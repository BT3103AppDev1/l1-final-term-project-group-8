<template>
  <LayoutHeader></LayoutHeader>
  <MovingBanner></MovingBanner>
  <div class = "reco-top10">
    <booklist :booklist="books"></booklist>
    <Top10Books :books="books"></Top10Books>
  </div>
</template>

<script setup>
  import LayoutHeader from './components/LayoutHeader.vue'
  import MovingBanner from './components/MovingBanner.vue'
  import Top10Books from './components/Top10Books.vue'
  import booklist from './components/booklist.vue'

  const books = [
          {
            id: 1,
            title: 'The Kamogawa Food Detectives',
            author: 'Hishashi Kashiwai',
            category: 'Mystery',
            pages: '159',
            cover: 'path-to-kamogawa-food-detectives-cover.jpg'
          },
          {
            id: 2,
            title: 'Icebreaker',
            author: 'Hannah Grace',
            category: 'Romance, Comtemporary',//Book category: array
            pages:'424',
            cover: 'path-to-Icebreaker-cover.jpg'

          },
        ];
        
</script>

<style scoped>
 .reco-top10{
  display: flex;
  
 }
</style>
