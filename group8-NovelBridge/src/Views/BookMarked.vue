<template>  
    <LayoutHeader/>
    <div class="main-content">
    <div v-if = "isLoggedIn" class="status-bar">
        <router-link to="/unread" class="status-link" active-class="active">Unread</router-link>
        <router-link to="/ongoing" class="status-link" active-class="active">Ongoing</router-link>
        <router-link to="/completed" class="status-link" active-class="active">Completed</router-link>
    </div>
    <div v-else>
      <LoginFromBookMarked/>
    </div>
    <div>
        <router-view/>
    </div>
  </div>
    <Footer></Footer>

  </template>
  
  <script>
  import LayoutHeader from '@/components/LayoutHeader.vue'
  import firebaseApp from "@/firebase";
  import {getFirestore, doc, getDocs, getDoc, collection} from "firebase/firestore"
  import { getAuth, signOut, onAuthStateChanged, FacebookAuthProvider } from "firebase/auth";
  import LoginFromBookMarked from '@/components/LoginFromBookMarked.vue';
  import Footer from '@/components/Footer.vue';

  export default {
    name: "BookMarked",
    components: {
        LayoutHeader, LoginFromBookMarked, Footer
    },
    data() {
      return {
        isLoggedIn: false
      }
    },

    created() {
      const auth = getAuth();
      const user = auth.currentUser;
      // Listen for authentication state changes
      onAuthStateChanged(auth, (user) => {
          if (user) {
              this.isLoggedIn = !!user;
            }
        });
    }
  }
  </script>
  
  <style scoped>
.main-content {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}


footer {
  flex-shrink: 0;
}
  
  .status-bar{
    display:flex;
    gap: 40px;
    margin-top:3%;
    margin-left:2%;
  }
  .status-link{
    color: black; /* Set the text color to black */
    text-decoration: none; 
  }
  .status-link:hover{
    text-decoration: underline;
  }
  .status-link.active {
  color: #EC9006;
  }
  .active{
    color: #EC9006;
    text-decoration: underline;
  }

  </style>
