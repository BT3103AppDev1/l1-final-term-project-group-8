<template>
  <LayoutHeader />
  <div class="filter-section">
    <!-- Reader Filter Group -->
    <div class="filter-group reader-group">
      <label>Gender:</label>
      <button v-for="gender in genders" :key="gender" :class="{ 'active': activeGender === gender}"
      @click="setActiveGender(gender)" class="filter-font">
        {{ gender }}
      </button>
    </div>
    <!-- Category Filter Group -->
    <div class="filter-group category-group">
      <label>Category:</label>
      <button v-for="category in categories" :key="category" :class="{ 'active': activeCategory === category}" 
      @click="setActiveCategory(category)" class="filter-font">
        {{ category }}
      </button>
    </div>
    <!-- Word Count Filter Group -->
    <div class="filter-group word-count-group">
      <label>Word count:</label>
      <button v-for="wordCount in wordCounts" :key="wordCount" :class="{ 'active': activeWordCounts === wordCount}"  
      @click="setActiveWordCounts(wordCount)" class="filter-font">
        {{ wordCount }}
      </button>
    </div>
    <div class = "filter-group number-of-views-group">
      <label>Number of Views:</label>
      <button v-for="numberOfViews in numbersOfViews" :key="numberOfViews" :class="{ 'active': activeNumberOfViews === numberOfViews}"
      @click="setActiveNumberOfViews(numberOfViews)" class="filter-font">
        {{ numberOfViews }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      genders: ['All', 'Female', 'Male'],
      activeGender: 'All',
      categories: ['All', 'Fantasy', 'Historical Fiction', 'Science Fiction', 'Mystery', 'Romance', 'Thriller', 'Horror', 'Adventure', 'Contemporary'],
      activeCategory: 'All',
      wordCounts: ['All', 'Below 30k', '30k - 50k', '50k - 1million', 'Above 1million'],
      activeWordCounts: 'All',
      numbersOfViews: ['All', 'Below 1000', '1000 - 5000', '5000 - 10000', 'Above 10000'],
      activeNumberOfViews: 'All'
    };
  },
  methods: {
    applyFilter(type, value) {
      // Emit an event with the filter type and value
      this.$emit('apply-filter', { type, value });
    },

    setActiveGender(gender) {
      this.activeGender = gender;
      this.applyFilter('gender', gender );
    },

    setActiveCategory(category) {
      this.activeCategory = category;
      this.applyFilter('categories', category );
    },

    setActiveWordCounts(wordCount) {
      this.activeWordCounts = wordCount;
      this.applyFilter('wordCounts', wordCount);
    },

    setActiveNumberOfViews(numberOfViews) {
      this.activeNumberOfViews = numberOfViews;
      this.applyFilter('numberOfViews', numberOfViews);
    }


  },
};
</script>
<style scoped>
.filter-section {
  display: flex;
  flex-direction: column; /* Stack filter groups vertically */
  align-items: left; /* Align filter groups in the center */
  padding: 1rem;
  /*background-color: #f8f9fa; */
  /* Update background color if needed */
}

.filter-group {
  display: flex;
  align-items: left;
  margin-bottom: 0.5rem; /* Add space between filter groups */
}

.filter-group label {
  font-weight: 600; /* Make labels bold */
  color: #333; /* Label color */
  margin-right: 10px; /* Space between label and buttons */
}

.filter-group button {
  background-color: transparent; /* Button background */
  border: none; /* No border on buttons */
  color: #080808; /* Text color */
  font-weight: 400; /* Button font weight */
  padding: 5px 10px; /* Padding inside buttons */
  cursor: pointer; /* Cursor to pointer */
  border-radius: 0; /* No border radius */
  font-size: 1rem; /* Text size */
  text-transform: none; /* No text transform */
}

.filter-group button:hover{
  color: orange; /* Darker text on hover/active */
}

.filter-group button.active {
  color: orange;
  background-color: rgb(248, 227, 195);
  border-radius:20px;

}

/* Style for active class if it's managed separately */
.active {
  background-color: #e9ecef;
  color: #495057;
}

.filter-font{
  font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  margin-top:-0.2%;
}

/* Adjustments for mobile view if necessary */
@media (max-width: 768px) {
  .filter-group {
    flex-basis: 100%; /* Each filter group takes full width */
    justify-content: center; /* Center buttons in the group */
  }
}

</style>
