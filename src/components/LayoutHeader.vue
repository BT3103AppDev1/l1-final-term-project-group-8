<template>
    <header class="header-layout">
        <div class ="logo">
            <a href="https://imgur.com/wSokIet"><img src="https://i.imgur.com/wSokIet.png" title="source: imgur.com"/></a>
            <h1>Novel Bridge</h1>
        </div>
        <div class="status-bar">
            <a href="/home">Home</a>
            <a href="/library">Library</a>
            <a href="/bookmarked">BookMarked</a>
        </div>
        <div class = "search-bar">
            <input type="text" placeholder="Search for a book...">
        </div>
        <div class="login-signup">
            <h4 @click="onLogin">Log in</h4>
            <h4 @click="onSignUp">Sign Up</h4>
        </div>
    </header>
</template>

<script>

    export default {
        name:"LayoutHeader",
        methods:{
            onLogin() {},
            atSignUp() {}
        }
    }
</script>

<style scoped>
    .header-layout{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #FFE9CE;
        padding:5px;
    }
    .logo img {
        width: 100px; /* Set this to the desired width */
        height: auto;
    }
    .logo h1 {
        font-size:20px;
        font-weight: bold;
        margin:0
    }
    
    .status-bar{
        margin-left:150px;
        display:flex;
        gap:7vw;
    }
    
    a {
    text-decoration: none;
    color:black;
  }

    a:hover{
        text-decoration:underline;
    }
    
    .search-bar input{
        width:20vw;
        background: #D9D9D9;
        padding:7px;
        border:0px;
        border-radius: 20px;    
    }


    .login-signup{
        display:flex;
        gap:5vw;
        margin-right:10px;
        cursor: pointer;
    }

    .login-signup::before{
        content:"|";        
    }

    .login-signup h4:hover{
        color:#FF6E05;
    }




</style>