<template>
  <LayoutHeader />
  <div class="menu">
    <UserProfileInterface />
  </div>
  <div class="background">
    <img src="@/assets/UserProfile-background.png">
  </div>
</template>

<script>
import LayoutHeader from '@/components/LayoutHeader.vue';
import firebaseApp from "@/firebase";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { doc, setDoc, getDoc, collection } from "firebase/firestore";
import avatar from '@/assets/userprofile-avatar.png'
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import UserProfileInterface from '@/components/UserProfileInterface.vue';
import EditProfile from '@/components/EditProfile.vue'



const db = getFirestore(firebaseApp);
const auth = getAuth();
const storage = getStorage(firebaseApp);


export default {
  components: {
    LayoutHeader,
    UserProfileInterface
  },
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
}
  
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
  .menu{
    position: relative;

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