<template>
  <div class="login-background">
    <video autoplay loop class="video" src="https://i.imgur.com/5AzLsSi.mp4"></video>
  </div>
  <div class="signup-container">
    <router-link to="/" class="backhome-link">> Back to Novel Bridge</router-link>
    <form class="signup-form" @submit.prevent="submitForm">
      <div class="msg">
        <div class="account-exist">
          <h1>Don't have an account?</h1>
          <router-link to="/signup" class="link">Sign Up</router-link>
        </div>
        <div class="welcome">
          <h1>Welcome to Novel Bridge</h1>
          <p>Login</p>
        </div>
      </div>
      <div class="form-group">
        <label for="email">Enter your email address</label>
        <input type="email" id="email" v-model="user.email" placeholder="Email address" required>
      </div>
      <div class="form-group">
        <label for="password">Enter your password</label>
        <input type="password" id="password" v-model="user.password" placeholder="Password" required>
      </div>
      <div class="error-message">{{ error }}</div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import firebaseApp from "@/firebase";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

export default {
    name: 'Login',
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            error: '',
            isLoggedIn: false, // Track if user is logged in
        };
    },
    created() {
        // Listen for authentication state changes
        onAuthStateChanged(auth, (user) => {
            this.isLoggedIn = !!user;
        });
    },
    methods: {
        async submitForm() {
            const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailFormat.test(this.user.email)) {
                this.error = "Please re-enter email";
                return;
            }
            try {
                await signInWithEmailAndPassword(auth, this.user.email, this.user.password);
                this.$router.push({ path: "/" });
                console.log("user log in");
            } catch (error) {
                if (error.code === "auth/user-not-found") {
                    this.error = "Account does not exist. Please sign up";
                } else if (error.code === "auth/wrong-password") {
                    this.error = "Incorrect password. Please try again.";
                } else {
                    this.error = "An error occurred. Please try again later.";
                }
            }
        }
    }
}
</script>
<style scoped>
.signup-container {
  display:flex;
  flex-direction: column;
  justify-content: center;
  margin-left:68%;
  align-items: center;
  height: 100vh; /* or use 'min-height' if within another container */
}

.signup-form {
  padding: 1em;
  background: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}
.msg{
  display:flex;
  justify-content: space-between;
  width:100%;
}
.account-exist h1{
  margin-top:2%;
  font-size:10px;
  height:15%;
}
h1 {
    font-size:12px;   
}
p {
    margin-left:50%;
    font-size:18px;
    font-weight:bolder;
}
.link{
  color:#FF6E05;
  font-size:10px;
}
.form-group{
    margin-top:2%;
    margin-right: 20%;
}
 
label{
    font-size:13px;
    display: inline-block;
    text-align: left;
    width:180px;
}

#email, #password{
    width:230px;
    height:30px;
    margin-left:8%;
    box-shadow: none;
    border: 1px solid #FF6E05;
    border-radius:8px;

}
input::placeholder{
    text-indent: 3px;
}

button{
    width:230px;
    height:30px;
    margin-top:8%;
    margin-bottom:4%;
    border:0;
    border-radius: 8px;
    background-color: #F2C54E;
    margin-right:2%;
    font-weight: bolder;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
}
.login-background {
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh; /* This ensures that your background takes at least the full height of the viewport */
  width: 100vw; /* This ensures that your background takes the full width of the viewport */
  z-index: -1; /* Keep the z-index to ensure the video stays in the background */
  overflow: hidden;
}
.video {
  height: 100%;
  width: 100%;
  object-fit: cover;
  filter:contrast(105%);
  /* Adjust the pixel value for desired blur level */
  object-position: center;
}
.backhome-link{
  margin-left:40%;
  margin-bottom:10%;
  text-decoration: none;
  color:white;
}
.backhome-link:hover{
  text-decoration: underline;
}
.error-message{
  color:red;
  font-size: 12px;
  margin-right:38%;
  width:  250px;
}
</style>