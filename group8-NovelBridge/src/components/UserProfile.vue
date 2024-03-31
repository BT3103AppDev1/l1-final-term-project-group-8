<template>
    <div class="profile-page">
        <div class="profile-picture">
          <img :src="user.imageUrl" alt="User's profile picture" class="user-image" />
          <button class="edit-picture-button">
            <img src="@/assets/camera-icon.png" alt="Edit"  class="camera-image"/>
          </button><br>
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
          
          <br><br><button type="submit" @click.prevent="saveProfile">Save</button>
        </div>
    
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

  .bg-image {
  width: 100%;
  height: 200px;
  position: absolute;
  margin-left: 0%;
  z-index: 1; 
 }

 .user-image {
    width: 200px;
    margin-left: 100px;
    margin-top: 75px;
    top: 0;
    position: relative;
    z-index: 2;
  }
  

  .camera-image{
    width: 100px;
  }

  .edit-picture-button {
    border-radius: 50%;
    height: 80px;
    margin-left: 200px;
    margin-top: -50px;
    position: relative;
    z-index: 3;
  }

  .edit-picture-button{
    width: 100px;
  }

  .form-container {
  align-items: center;
  position: absolute;
  margin-left: 300px;
}

.form-label {
  font-size: 1.5em; /* Adjust the size as needed */
  margin-right: 15px;
}

input, select {
  font-size: 1.4em; 
}

.radio-label {
  font-size: 1.4em; 
  margin-right: 20px;
}

input[type="radio"] {
  margin-right: 5px; 
}

  .gender-selection {
    /* Your styles for gender selection */
  }

  input[type="radio"] {
  -webkit-appearance: none;
  appearance: none;
  width: 24px; /* Adjust the size as needed */
  height: 24px; /* Adjust the size as needed */
  border: 4px solid rgb(255, 153, 0); /* Adjust the border color as needed */
  border-radius: 50%;
  cursor: pointer;
}

input[type="radio"]:checked {
  background-color: rgb(255, 153, 0); /* Adjust the checked color as needed */
}

 
  button[type="submit"] {
  padding: 5px 25px; 
  font-size: 1.8em; 
  background-color: #efa94d; 
  border: none; 
  border-radius: 14px; 
}
  </style>
  