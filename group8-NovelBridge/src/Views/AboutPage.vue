<template>
    <LayoutHeader></LayoutHeader>
    <About></About>
    <Footer></Footer>
  </template>

  
<script>
import LayoutHeader from '@/components/LayoutHeader.vue'
import firebaseApp from "@/firebase";
import {getFirestore, doc, getDocs, getDoc, collection} from "firebase/firestore"
import { getAuth, signOut, onAuthStateChanged, FacebookAuthProvider } from "firebase/auth";
import LoginFromBookMarked from '@/components/LoginFromBookMarked.vue';
import About from '@/components/About.vue';
import Footer from '@/components/Footer.vue';


export default {
  name: "BookMarked",
  components: {
      LayoutHeader, 
      About,
      Footer
  },
}

</script>