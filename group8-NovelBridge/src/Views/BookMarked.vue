<template>
    <LayoutHeader @search-input="handleSearch" />
    <div class="status-bar">
        <router-link to="/unread" class="status-link" active-class="active">Unread</router-link>
        <router-link to="/ongoing" class="status-link" active-class="active">Ongoing</router-link>
        <router-link to="/completed" class="status-link" active-class="active">Completed</router-link>
    </div>
    <div>
        <router-view/>
    </div>
  </template>
  
  <script>
  import LayoutHeader from '@/components/LayoutHeader.vue'

  export default {
    name: "BookMarked",
    components: {
        LayoutHeader
    },
  }
  </script>
  
  <style scoped>
  .status-bar{
    display:flex;
    gap: 40px;
    margin-top:3%;
    margin-left:2%;
  }
  .status-link{
    color: black; /* Set the text color to black */
    text-decoration: none; 
  }
  .status-link:hover{
    text-decoration: underline;
  }
  .status-link.active {
  color: #EC9006;
  }
  .active{
    color: #EC9006;
    text-decoration: underline;
  }
  </style>
