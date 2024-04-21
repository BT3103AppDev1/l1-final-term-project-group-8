<template>
    <div class="login-background">
      <video autoplay loop class="video" src="https://i.imgur.com/5AzLsSi.mp4"></video>
    </div>
    <div class="signup-container">
      <router-link to="/" class="backhome-link">> Back to Novel Bridge</router-link>
      <form class="signup-form" @submit.prevent="submitForm">
          <div class="welcome">
            <img src="https://i.imgur.com/wSokIet.png" alt="Novel Bridge Logo" title="source: imgur.com"/>
            <h2>Novel Bridge</h2>
            <h6>Please enter the email address associated with your <br> 
                account then we will sent a link for you to reset <br>
                your password
            </h6>
            <h6></h6>
          </div>
          <div class="form-group">
            <label for="email">Enter your email address</label>
            <input type="email" id="email" v-model="user.email" placeholder="Email address" required>
          </div>
        <div class="error-message">{{ error }}</div>
        <div class="error-message">{{ successMessage }}</div>
        <button type="submit">Continue</button>
      </form>
    </div>
  </template>

<script>
import { getAuth, sendPasswordResetEmail } from "firebase/auth";


export default {
    name: 'ResetPassword',
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            error: '',
            successMessage: '',
        };
    },
    methods: {
    async submitForm() {
      const auth = getAuth();
      sendPasswordResetEmail(auth, this.user.email)
        .then(() => {
          // Password reset email sent!
          this.error = '';
          this.successMessage = 'Email sent! Check inbox for the reset link.';
          setTimeout(() => {
            this.$router.push({ name: 'Login' }); // Use the actual name of your login route
          }, 5000); // 3 seconds delay
        })
        .catch((error) => {
          this.error = error.message;
          this.successMessage = '';
        });
    }
  },
}
</script>

<style scoped>
.welcome img{
    width: 150px;
    height: auto;
}
.welcome h6{
    margin-top:3%;
    margin-bottom:5%;
    color:#FF6E05
}
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

.signup-form h5{
  text-align: end;
  margin-right:8%;
  color: #FF6E05;
  text-decoration: underline;
  cursor: pointer;
}

.signup-form h5:hover{
  color:lightsalmon;
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