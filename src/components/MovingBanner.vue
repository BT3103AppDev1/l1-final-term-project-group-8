<template>
  <div class="banner">
    <transition-group name="slide" tag="div" class="slide-container">
      <img
        v-for="(img, index) in images"
        :key="img"
        :src="img"
        alt="Dynamic Image"
        v-show="index === currentIndex"
      >
    </transition-group>
  </div>
</template>

<script>
export default {
    name: 'MovingBanner',
    data() {
      return {
        images: [
          'https://i.imgur.com/W1goNf3.png',  // Replace with paths to your images
          'https://i.imgur.com/hX2Tm3l.png', // Replace with paths to your images
          'https://i.imgur.com/mNlbvZi.png'
        ],
        currentIndex: 0
      };
    },
    computed: {
      currentImage() {
        return this.images[this.currentIndex];
      }
    },
    mounted() {
      setInterval(this.nextImage, 3000); // Change image every 3 seconds
    },
    methods: {
      nextImage() {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
      }
    }
  };
  </script>

<style scoped>
  .banner {
  width: 100%; /* Ensure the container has width */
  height: 250px;
  overflow: hidden; /* Ensures images outside this container are not shown */
  position: relative; /* Positions the slide-container absolutely relative to this */
  }

  .slide-container {
    position: absolute;
    width: 100%;
    height: 250px;
  }

  .slide-container img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    position: absolute; /* Absolutely position images within the slide-container */
    transition: transform 0.5s ease;
  }

  .slide-enter-from, .slide-leave-to {
    transform: translateX(100%);
  }
  .slide-leave-from, .slide-enter-to {
    transform: translateX(0);
  }
    </style>