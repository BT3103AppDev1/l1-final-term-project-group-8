<template>
    <div class="profile-page">
      <section class="user-profile">
        <div class="profile-picture">
          <img :src="user.imageUrl" alt="User's profile picture" class="user-image" />
          <button class="edit-picture-button">
            <img src="@/assets/camera-icon.png" alt="Edit" />
          </button>
        </div>
        <form class="profile-form">
          <label>
            User Name:
            <input type="text" v-model="user.name">
          </label>
          <div class="gender-selection">
            <label>Gender:</label>
            <input type="radio" id="male" value="Male" v-model="user.gender">
            <label for="male">Male</label>
            <input type="radio" id="female" value="Female" v-model="user.gender">
            <label for="female">Female</label>
            <input type="radio" id="other" value="Other" v-model="user.gender">
            <label for="other">Prefer not to say</label>
          </div>
          <label>
            Preferred Language:
            <select v-model="user.language">
              <option>English</option>
              <option>中文</option>
              <!-- ... other languages ... -->
            </select>
          </label>
          <button type="submit" @click.prevent="saveProfile">Save</button>
        </form>
      </section>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          name: 'Hello', // Default name for the demo
          gender: 'Other', // Default gender selection for the demo
          language: 'English', // Default language for the demo
          imageUrl: '@/assets/user-placeholder.jpg', // Path to user image placeholder
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
  /* Add your CSS here */
  .profile-page {
    /* Your styles for the page */
  }

  .user-profile {
    /* Your styles for user profile section */
  }
  .profile-picture {
    /* Your styles for the profile picture */
  }
  .profile-form {
    /* Your styles for the form */
  }
  .gender-selection {
    /* Your styles for gender selection */
  }
  /* ... more styles ... */
  </style>
  