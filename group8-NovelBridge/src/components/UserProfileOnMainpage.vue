<template>
    <div class="menu">
      <Homepage />
    </div>
    <div class="overlay">
      <UserProfileInterface />
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
  import Homepage from '@/Views/Homepage.vue';
  
  
  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  const storage = getStorage(firebaseApp);
  
  
  export default {
    components: {
    UserProfileInterface,
    Homepage
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
    
    /* Add your CSS here */
    
    .menu{
      position: relative;
    }

    .overlay {
    position: absolute;
    top: 0;
    right: 0;
  }
    
  
    
  </style>