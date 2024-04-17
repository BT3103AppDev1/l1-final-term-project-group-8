<template>
    <div class="background">
      <img src="@/assets/UserProfile-background.png">
    </div>
    <div class="profile-page">
        <div class="profile-picture">
          <img :src="this.user.imageUrl" alt="User's profile picture" class="user-image" />
          <div class="container">
          <div class="round-box"></div>
            <img @click="uploadImg" src="@/assets/camera-icon.jpg" alt="Camera"  class="camera-icon"/>
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
  import { getFirestore} from 'firebase/firestore';
  import { doc, setDoc, getDoc, collection } from "firebase/firestore";
  import avatar from '@/assets/userprofile-avatar.png'
  import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  
  
  
  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  const storage = getStorage(firebaseApp);
  
  
  export default {
    name:"EditProfile",
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
     created() {
          const auth = getAuth();
          const user = auth.currentUser;
          console.log ("User info", user)
          // Listen for authentication state changes
          onAuthStateChanged(auth, (user) => {
              if (user) {
                  this.fetchUserProfile();
              }
          });
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
          this.error = "Error saving profile"
          console.error(this.error);
        }
      },
  
      async fetchUserProfile() {
        const db = getFirestore(firebaseApp)
        const auth = getAuth();
        const user = auth.currentUser;
        const userDocInfo = doc(db,'users', user.uid);
        try {
              const userDoc = await getDoc(userDocInfo);
              if ( userDoc.exists()) {
                  const userData = userDoc.data();
                  this.user.name = userData.Username;
                  this.user.gender = userData.Gender;
                  this.user.language = userData.language;
                  if (userData.imageUrl) {
                    this.user.imageUrl = userData.imageUrl;
                  } else {
                    this.userimageUrl = avatar;
                  }
  
              } else {
              console.log('No such document!');
          }
      } catch (error) {
          console.error('Error getting document:', error);
      }},
      
      async uploadImg() {
        try {
          const fileInput = document.createElement('input');
          fileInput.type = 'file';
          fileInput.accept = 'image/*';
          fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) {
              return;
            }
  
            const auth = getAuth();
            const currentUser = auth.currentUser;
            if (!currentUser) {
              this.error = "No user signed in";
              console.error(this.error);
              return;
            }
            const storageRef = ref(storage, `profilePictures/${currentUser.uid}`);
              await uploadBytes(storageRef, file);
              const imageUrl = await getDownloadURL(storageRef);
  
              this.user.imageUrl = imageUrl;
            };
            fileInput.click();
          } catch (error) {
            this.error = "Error uploading image"
            console.error(this.error);
          }
        },
  
      }
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
      width: 130px; /* Set the width of the image */
      height: 130px; /* Set the height of the image */
      object-fit: cover; /* This will ensure that the image covers the area without being stretched */
      border-radius: 50%; /* This makes the image round */
      border: 3px 
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
      transform: translate(-50%, -15%);
    }
  
    .camera-icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -7%);
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