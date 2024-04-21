<template>
    <div class="login-background">
      <video autoplay loop class="video" src="https://i.imgur.com/5AzLsSi.mp4">
      </video>
    </div>
    <div class="signup-container">
    <router-link to="/" class="backhome-link">> Back to Novel Bridge</router-link>
    <form class="signup-form" @submit.prevent="submitForm">
      <div class = "msg">
        <div class="account-exist">
          <h1>Have an account?</h1>
          <router-link to="/login" class="link">Login</router-link>
        </div>
        <div class ="welcome">
        <h1>Welcome to Novel Bridge</h1>
        <p>Sign Up</p>
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
      <div class="form-group">
        <label for="confirm-password">Re-enter your password</label>
        <input type="password" id="confirm-password" v-model="user.confirmPassword" placeholder="Confirm Password" required>
      </div>
      <div class="error-message">{{error}}</div>
      <button class="submit-btn" type="submit">Sign Up</button>
      <h5> OR </h5>
      <router-link to="/login" class="google-link">
          Sign in with Google?
      </router-link>
    </form>
  </div>
</template>

<script>
import firebaseApp from "@/firebase";
import {getFirestore} from "firebase/firestore"
import { getAuth, createUserWithEmailAndPassword,GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const db = getFirestore(firebaseApp)
const auth = getAuth()

export default {
  name: 'SignUp',
  data() {
    return {
      user: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      error:''
    };
  },
  methods: {
    async submitForm() {
      const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if(!emailFormat.test(this.user.email)) {
        this.error = "Please re-enter email";
        return
      }
      if(this.user.password !== this.user.confirmPassword) {
        this.error = "Password does not match";
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth,this.user.email, this.user.password).
        then((userCredential) => {
          const userInfo = {
            email:this.user.email,
            password: this.user.password,
            Favourite: [],
            Completed: [],
            Ongoing: [],
            Unread: [],
            Progress:[],
          }
          console.log('User created');
          this.$router.push({path:"/userprofile"})

          const authuser = userCredential.user
          const userAdded = setDoc(doc(db, "users", authuser.uid), userInfo)
        });
        
      } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        // Here you handle the scenario where the account already exists
        this.error = "Account already exists. Please log in.";
      } else {
        // Handle other errors (e.g., network issues, server errors)
        console.error('Error during account creation', error);
        this.error = "An error occurred. Please try again later.";
      }
    }
  },
  /*signInWithGoogle() {
      const provider = new GoogleAuthProvider();
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token which you can use to access the Google API.
          // const token = result.credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          
          // You might want to create or update the user document in Firestore
          // If a document with the UID already exists, it won't be overwritten due to `merge: true`.
          setDoc(doc(db, "users", user.uid), {
            email: user.email,
            Favourite: [],
            Completed: [],
            Ongoing: [],
            Unread: [],
            Progress:[],
            // You can store additional user information here
          }, { merge: true });

          console.log('Google sign-in successful');
          this.$router.push({path:"/userprofile"});
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.error(errorCode, errorMessage, email, credential);
          this.error = "An error occurred with Google Sign-In. Please try again.";
        });
    },*/
  },
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
  padding:1em;
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
    font-size:18px;
    font-weight:bolder;
}
.google-link{
  color:#FF6E05;
  font-size:13px;
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

#email, #password, #confirm-password{
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

.google-signin img {
  width:30px;
  height:27px;
  margin-right: 8px;
}

.google-signin button {
  display: flex; /* Use flexbox */
  align-items: center; /* Align items vertically */
  justify-content: center; /* Align items horizontally */
  width: 180px;
  height: 35px; /* Adjust height as needed */
  border: none;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  margin-top: 3%;
  margin-left:16%;
  font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
  cursor: pointer; /* Makes it clear the button is clickable */
  transition: background-color 0.3s;
}

.submit-btn{
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