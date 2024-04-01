<template>
    <div class="background">
      <img src="@/assets/UserProfile-background.png">
    </div>
    <div class="profile-page">
      <div class="profile-picture">
          <img :src="user.imageUrl" alt="User's profile picture" class="user-image" />
          <div class="container">
          <div class="round-box"></div>
          <img src="@/assets/camera-icon.jpg" class="camera-icon" alt="Camera" />
          </div>
        </div>
      <section class="user-profile">
        <form>
          <label class="profile-form">
            User Name:
            <input type="text" v-model="user.name">
          </label>
          <div class="profile-form">
            <label>Gender:</label>
            <input type="radio" id="male" value="Male" v-model="user.gender">
            <label for="male">Male</label>
            <input type="radio" id="female" value="Female" v-model="user.gender">
            <label for="female">Female</label>
            <input type="radio" id="other" value="Other" v-model="user.gender">
            <label for="other">Prefer not to say</label>
          </div>
          <label class="profile-form">
            Preferred Language:
            <select v-model="user.language">
              <option>English</option>
              <option>中文</option>
              <!-- ... other languages ... -->
            </select>
          </label>
        </form>
      </section>
      <button class="submitbtn" type="submit" @click.prevent="saveProfile">Save</button>
    </div>
  </template>
  
  <script>
  import avatar from '@/assets/userprofile-avatar.png'

  export default {
    name:"UserProfile",
    data() {
      return {
        user: {
          name: 'Hello', // Default name for the demo
          gender: 'Other', // Default gender selection for the demo
          language: 'English', // Default language for the demo
          imageUrl: avatar, // Path to user image placeholder
        }
      };
    },
    methods: {
      saveProfile() {
        // Here you would handle the logic to save the user's profile
        alert('Profile saved');
      }
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
    width: 45px;
    height: 45px;
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
  .profile-form {
    margin-top:10%;
    margin-bottom:10%;
  }

  input{
    margin-left:2%;
  }
  .submitbtn{
    margin-top:3%;
  }
  </style>
  