<template>
    <header class="header-layout">
        <div class ="logo">
            <img src="https://i.imgur.com/wSokIet.png" title="source: imgur.com"/>
            <h1>Novel Bridge</h1>
        </div>
        <div class="status-bar">
            <router-link to="/" class="header-link" >Home</router-link>
            <a href="/library">Library</a>
            <router-link
            v-if = "isLoggedIn"
            to="/bookmarked"
            class = "header-link"
            active-class="active"
            >bookmarked</router-link>
            <a
            v-else
            href ="#"
            class = "header-link"
            @click.prevent = "promptSignUp"
            >bookmarked</a>
        </div>
        <div class = "search-bar">
            <input type="text" placeholder="Search for a book...">
        </div>
        <div class="login-signup">
            <router-link to="/login" class="login-link">Login</router-link>
            <router-link to="/signup" class="login-link">Sign Up</router-link>
            <router-link to="/userprofile" class="header-link">User</router-link>
        </div>
    </header>
</template>

<script>
export default {
    name: "LayoutHeader",
    data() {
        return {
            isLoggedIn: false, 
        }
    },
    methods: {
        promptSignUp() {
            if (confirm('You must be signed up to bookmark. Would you like to sign up now?')) {
                this.$router.push('/signup');
            } else {
                this.$router.push('/');
            }
        },
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
    
    .header-link {
    text-decoration: none;
    color:black;
    }

    .header-link:hover{
        text-decoration:underline;
    }

    .active{
        font-weight: bolder;
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

    .login-link {
        text-decoration: none;
        color:black;
    }

    .login-link:hover{
        color:#FF6E05;
    }




</style>