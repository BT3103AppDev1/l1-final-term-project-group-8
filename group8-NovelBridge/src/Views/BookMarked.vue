<template>
  <div id="app">
    <LayoutHeader />
    <div id = "nav">
    <router-link to="/completed">Completed</router-link>
    <router-link to ="/Ongoing">Ongoing</router-link>
    <router-link to="/Unread"> Unread </router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import LayoutHeader from '@/components/LayoutHeader.vue'; // Import the LayoutHeader component

export default {
  components: {
    LayoutHeader // Register the LayoutHeader component
  },
};
</script>

<style>
/* Ensure the body takes full height and no overflow */
body, html {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow-x: hidden; /* Prevent horizontal scrollbar */
}

/* Container for the whole app */
#app {
  display: flex;
  flex-direction: column; /* Stack header and main content */
  height: 100%;
}

/* Header styles */
.layout-header {
  width: 100%; /* Take full width of the container */
  /* Add any other styling you need for your header */
}

/* Subheader styles */
.sub-header {
  display: flex; /* Align the links in a row */
  justify-content: center; /* Center the links horizontally */
  gap: 10px; /* Add some space between the links */
  /* Add any other styling you need for your subheader */
}

/* Main content styles */
.main-content {
  flex-grow: 1; /* Allow the content to grow and fill the space */
  width: 100%; /* Take full width */
  /* Add any other styling you need for the main content area */
}
#nav {
  display: flex; /* Display the links inline */
  justify-content: center; /* Center them horizontally */
  padding: 10px; /* Add some padding */
}

/* Ensure that #nav doesn't overlap with the header */
.layout-header + #nav {
  margin-top: 10px; /* Add margin-top if needed */
}


/* Example media query for responsiveness */
@media (max-width: 768px) {
  .sub-header {
    flex-direction: column; /* Stack the links in a column on small screens */
  }
}

</style>