<template>
    <header class="header-layout">
        <div class ="logo">
            <img src="https://i.imgur.com/wSokIet.png" title="source: imgur.com"/>
            <h1>Novel Bridge</h1>
        </div>
        <div class="status-bar">
            <router-link to="/" class="header-link" >Home</router-link>
            <router-link to="/library" class ="header-link" active-class="active"> Library </router-link>
            <router-link
            v-if = "isLoggedIn"
            to="/bookmarked"
            class = "header-link"
            active-class="active"
            >Bookmarked</router-link>
            <a
            v-else
            href ="#"
            class = "header-link" 
            @click.prevent = "promptSignUp"
            >Bookmarked</a>
        </div>
        <div class="search-bar">
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Search for a book..."
            @keyup.enter="searchBooks" >
        </div>


        <div v-if="isLoggedIn" class="logout" @click="signOut">
            <h4>LogOut</h4>
        </div>
        <div v-else class="login-signup">
            <router-link to="/login" class="login-link">Login</router-link>
            <router-link to="/signup" class="login-link">Sign Up</router-link>
        </div>

        <transition name="slide">
            <div v-if="isLoggedIn"> 
                <router-link to="/userprofileO"><img :src="userProfile" alt="User profile img" class="profileImg"></router-link>
            </div>
        </transition>
    </header>
</template>

<script>
import firebaseApp from "@/firebase";
import {getFirestore, doc, getDocs, getDoc, collection} from "firebase/firestore"
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";

export default {
    name: "LayoutHeader",
    data() {
        return {
            isLoggedIn: false, 
            userProfile: '',
            searchQuery: '',
        }
    },
    created() {
        const auth = getAuth();
        const user = auth.currentUser;
        console.log ("User info", user)
        // Listen for authentication state changes
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.isLoggedIn = true;
                this.fetchProfilePhoto(user.uid);
            }
        });
    },
    methods: {
        async searchBooks() {
    const trimmedQuery = this.searchQuery.trim().toLowerCase();
    if (trimmedQuery) {
      // Perform a database search instead of using this.allBooks
      const db = getFirestore(firebaseApp);
      const booksCollectionRef = collection(db, "Books");
      const querySnapshot = await getDocs(booksCollectionRef);
      let matchedBook = null;

      querySnapshot.forEach((doc) => {
        const bookData = doc.data();
        if (bookData.Title && bookData.Title.toLowerCase().includes(trimmedQuery)) {
          matchedBook = { id: doc.id, ...bookData };
        }
      });

      // If a book is found, navigate to its details page
      if (matchedBook) {
        this.$router.push({ name: 'BookDetail', params: { id: matchedBook.id } });
      } else {
        // Handle the case where no book is found
        alert('No book found with that title.');
      }
    }
  },

        promptSignUp() {
            if (confirm('You must be signed up to bookmark. Would you like to sign up now?')) {
                this.$router.push('/signup');
            } else {
                this.$router.push('/');
            }
        },
        async fetchProfilePhoto(userID) {
            const db = getFirestore(firebaseApp)
            const userDocInfo = doc(db,'users', userID);
            
            try {
                const userDoc = await getDoc(userDocInfo);
                if ( userDoc.exists()) {
                    const userData = userDoc.data();
                    this.userProfile = userData.imageUrl;

                } else {
                console.log('No such document!');
            }
        } catch (error) {
            console.error('Error getting document:', error);
        }},

        signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth)
            this.isLoggedIn = false
            this.$router.push({path:"/"})
        }
    }}
</script>

<style scoped>
    .header-layout{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #FFE9CE;
        padding:5px;
    }
    .logo img {
        width: 100px;
        height: auto;
    }
    .logo h1 {
        font-size:20px;
        font-weight: bold;
        margin:0
    }
    
    .status-bar{
        margin-left:150px;
        display:flex;
        gap:7vw;
    }
    
    .header-link {
    text-decoration: none;
    color:black;
    }

    .header-link:hover{
        text-decoration:underline;
    }

    .active{
        font-weight: bolder;
    }
    
    .search-bar input{
        width:20vw;
        background: #D9D9D9;
        padding:7px;
        border:0px;
        border-radius: 20px;    
    }
    .profileImg{
        width:55px;
        height:55px;
        object-fit: cover;
        border-radius: 50%;
    }
    .login-signup{
        display:flex;
        gap:5vw;
        margin-right:10px;
        cursor: pointer;
    }

    .login-signup::before{
        content:"|";        
    }

    .login-link {
        text-decoration: none;
        color:black;
    }

    .login-link:hover{
        color:#FF6E05;
    }

    .logout{
        display:flex;
        gap:5vw;
        margin-right:10px;
        cursor: pointer;
    }
    
    .logout:hover{
        color:#FF6E05;
    }

    .slide-enter-active, .slide-leave-active {
        transition: transform 0.5s;
    }

    .slide-enter, .slide-leave-to {
        transform: translateX(100%);
    }




</style>