<template>
    <div class="background">
      <img src="@/assets/UserProfile-background.png">
    </div>
    <div class="profile-page">
        <div class="profile-picture">
          <img :src="user.imageUrl" alt="User's profile picture" class="user-image" />
          <div class="container">
          <div class="round-box"></div>
            <img  src="@/assets/camera-icon.jpg" alt="Camera"  class="camera-icon"/>
          </div>
        </div>
        <div class="form-container">
          <label class="form-label">
            User Name:
            <input type="text" v-model="user.name"> <br><br>
          </label>

          <div class="gender-selection">
            <label class="form-label">Gender:</label>
            <input type="radio" id="male" value="Male" v-model="user.gender">
            <label for="male">Male</label>
            <input type="radio" id="female" value="Female" v-model="user.gender">
            <label for="female">Female</label>
            <input type="radio" id="other" value="Other" v-model="user.gender">
            <label for="other">Prefer not to say</label><br><br>
          </div>
          
          <label class="form-label">
            Preferred Language:
          </label>
            <select v-model="user.language">
              <option>English</option>
              <option>中文</option>
              <option>日本語 </option>
              <option>Español</option>
              <option>Français</option>
              <option>Deutsch</option>
              <option>Italiano</option>
              <option>Português</option>
              <option>Русский</option>
              <option>한국어</option>
              <!-- ... other languages ... -->
            </select>
          <br><br><button class = "savebtn" type="submit" @click.prevent="saveProfile">Save</button>
        </div>
        <div>{{ error }}</div>
    </div>
  </template>
  
  <script>
  import firebaseApp from "@/firebase";
  import { getAuth, onAuthStateChanged } from 'firebase/auth';
  import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
  import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage'
  import avatar from '@/assets/userprofile-avatar.png'

  const auth = getAuth();
  const db = getFirestore(firebaseApp);

  export default {
    name:"UserProfile",
    data() {
      return {
        user: {
          name: '', // Default name for the demo
          gender: 'Other', // Default gender selection for the demo
          language: 'English', // Default language for the demo
          imageUrl: avatar, // Path to user image placeholder
        },
        error:''
      };
    },
    created(){
      this.fetchUserProfilePic();
    },
    methods: {
      async saveProfile() {
        const currentUser = auth.currentUser;
        if (!currentUser) {
          this.error = "No user signed in";
          console.error(this.error,)
        }

        try{

          const userDoc = doc(db, 'users', currentUser.uid);
          await setDoc(userDoc,{
            Username: this.user.name,
            Gender: this.user.gender,
            language:this.user.language,
            imageUrl: this.user.imageUrl,
          }, {merge: true});

          console.log('Profile saved')
          this.$router.push({path:"/"})
        } catch (error) {
          this.error = `Error saving profile: ${error.message}`;
          console.error(this.error);
        }
      }},
};
  </script>
  
  <style scoped>
  .background{
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh; /* This ensures that your background takes at least the full height of the viewport */
    width: 100vw; /* This ensures that your background takes the full width of the viewport */
    z-index: -1; /* Keep the z-index to ensure the video stays in the background */
    overflow: hidden;
  }
  /* Add your CSS here */
  .profile-page {
    display:flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height:100vh;
    width:100%;
    
  }
  .profile-picture {
    display:flex;
    justify-content: center;
    align-items: center;
    
  }
  .user-image{
    width:40%;
    height:auto;
  }
  .container {
  position: relative;
  margin-top:30%;
  /* Set other styles as needed, like width, height, etc. */
  }

  .round-box {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #f0f0f0;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .camera-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer; /* This changes the cursor to a pointer when hovering over the icon */
    /* Set the size of your icon */
    width: 50px;
    height: 27px;

  }
  .user-profile {
    margin-top:3%;
    width: 300px;
  }
  .form-container{
    margin-top:3%;

  }
  .profile-form {
    margin-top:10%;
    margin-bottom:10%;
  }

  input{
    margin-left:2%;
  }
  .savebtn{
    margin-left:40%;
  }
</style>
