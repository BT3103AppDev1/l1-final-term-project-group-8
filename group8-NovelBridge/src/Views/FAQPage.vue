<template>
    <LayoutHeader></LayoutHeader>
    <FAQ></FAQ>
    <Footer></Footer>
  </template>

  
<script>
import LayoutHeader from '@/components/LayoutHeader.vue'
import firebaseApp from "@/firebase";
import {getFirestore, doc, getDocs, getDoc, collection} from "firebase/firestore"
import { getAuth, signOut, onAuthStateChanged, FacebookAuthProvider } from "firebase/auth";
import LoginFromBookMarked from '@/components/LoginFromBookMarked.vue';
import Footer from '@/components/Footer.vue';
import FAQ from '@/components/FAQ.vue';

export default {
  name: "FAQPage",
  components: {
      LayoutHeader, 
      FAQ,
      Footer
  },
}

</script>