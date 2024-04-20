<template>
    <div class="container">
     <div>
        <img class="image" src="@/assets/Bookmarked-login.png" alt="Bookmarked login"/>
        <h5>~Please login to access bookmarked/favourite ~</h5>
    </div>
    <button class="bookmark-btn" @click="goToLogIn">
        Log in to Novel Bridge
    </button>
    </div> 
</template>

<script>
export default {
    name: "LoginFromBookMarked",
    methods:{
        goToLogIn() {
            this.$router.push({ name: 'Login'});
        }
    }
}
</script>

<style scoped>
.container {
    margin-top:7%;
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.image {
    margin-left:37%;
    margin-bottom:0%;
    width:50%;
    height:85%;
}
h5 {
    text-align: center;
    margin-bottom:5%;
    color: grey;
}

.bookmark-btn {
  background-image:linear-gradient(#FF6E05,#FF9E44, #F8AF40); /* Orange color */
  border: none;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  color: black;
  padding: 10px 20px;
  border-radius: 20px; /* Rounded corners */
  font-weight: bold;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Optional: Adds a slight shadow for depth */
  transition: background-color 0.3s; /* Smooth transition for hover effect */
  cursor: pointer; 
}

.bookmark-btn:hover {
  color:blanchedalmond;
}

</style>