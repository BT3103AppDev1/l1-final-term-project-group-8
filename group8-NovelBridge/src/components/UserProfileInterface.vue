<template>
    <div class="user-profile-overlay">
      <div class="user-profile-menu" >
        <div class="close-btn" @click="goToHomePage">&times;</div>
        <div class="user-profile-header">
            <img :src="this.user.imageUrl" alt="User's profile picture" class="user-image" />
          <h2>{{ this.user.name}}</h2>
          <p>{{ this.user.email }}</p>
        </div>
        <ul class="user-profile-options">
          <li><router-link to="/editProfile" class="header-link" >Edit Profile</router-link></li>
          <li><router-link to="/favourite" class="header-link" >Favourite</router-link></li>
          <li><router-link to="/bookmarked" class="header-link" >Bookmarked</router-link></li>
          <li><router-link to="/readingHistory" class="header-link" >Reading History</router-link></li>
          <li>Share the website with friends</li>
        </ul>
        <UserProfileMenu @editProfile="showEditProfile = true" />
        <EditProfile v-if="showEditProfile" @close="showEditProfile = false" />
        <button @click="signOut" class="logout-btn" >LogOut</button>
      </div>
    </div>
  </template>
  
  <script>
  import LayoutHeader from '@/components/LayoutHeader.vue';
  import firebaseApp from "@/firebase";
  import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
  import { getFirestore} from 'firebase/firestore';
  import { doc, setDoc, getDoc, collection } from "firebase/firestore";
  import avatar from '@/assets/userprofile-avatar.png'
  import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
  import EditProfile from '@/components/EditProfile.vue';
  
  
  
  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  const storage = getStorage(firebaseApp);
  
  
  export default {
    components: {
      LayoutHeader,
      EditProfile
    },
    name:"UserProfile",
    data() {
      return {
        user: {
          name: '', // Default name for the demo
          gender: 'Other', // Default gender selection for the demo
          language: 'English', // Default language for the demo
          imageUrl: avatar, // Path to user image placeholder
          email:'',
        },
        showEditProfile: false,
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
      goToHomePage() {
      this.$router.push('/');
      },

      signOut() {
            const auth = getAuth();
            const user = auth.currentUser;
            signOut(auth)
            this.$router.push({path:"/"})
      },

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
                  this.user.email = userData.email;
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

    .user-profile-options .active {
      color: rgb(249, 175, 79); /* Change color to match your design */
    }

    .header-link:hover {
      color: rgb(244, 161, 67); /* Color when hovered */
    }
    
    .user-profile-overlay {
      display: flex;
      justify-content: center;
      right: 0;
      top: 0;/* or whatever value you need */
      /* other styles */
    }

  .user-profile-menu {
    background: white;
    padding: 20px;
    width: 300px; /* Adjust width as necessary */
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position:relative
  }

  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    font-size: 25px;
    cursor: pointer;
  }
  
  .user-profile-header .avatar {
    display: block;
    margin: 0 auto 10px;
    width: 80px; /* Adjust size as necessary */
    height: 80px;
    border-radius: 50%;
  }

  .user-image {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin-top: 50px;
    margin-left: 60px; 
  }
  
  .user-profile-header h2,
  .user-profile-header p {
    text-align: center;
    margin: 5px 0;
  }
  
  .user-profile-options {
    list-style: none;
    padding: 0;
    margin: 20px 0;
  }
  
  .user-profile-options li {
    padding: 10px 0;
    cursor: pointer;
  }
  
  .logout-btn {
    background-color: #fba543;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    color: white;
    border: none;
    padding: 10px 15px;
    margin-top: 20px;
    margin-left: 42px;
    width: 70%;
    border-radius: 7px;
    cursor: pointer;
    font-size: 15px;
  }

  .header-link {
  text-decoration: none;
  color: black; 
}
  
  .logout-btn:hover {
    background-color: #f78636;
  }
  </style>