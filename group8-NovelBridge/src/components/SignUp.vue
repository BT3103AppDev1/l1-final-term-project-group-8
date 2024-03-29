<template>
    <LayoutHeader/>
    <div class="signup-container">
    <form class="signup-form" @submit.prevent="submitForm">
      <h1>Welcome to Novel Bridge</h1>
      <p>Sign Up</p>
      <div class="form-group">
        <label for="email">Enter your email address</label>
        <input type="email" id="email" v-model="user.email" placeholder="Email address" required>
      </div>
      <div class="form-group">
        <label for="password">Enter your password</label>
        <input type="password" id="password" v-model="user.password" placeholder="Password" required>
      </div>
      <div class="form-group">
        <label for="confirm-password">Re-enter your password</label>
        <input type="password" id="confirm-password" v-model="user.confirmPassword" placeholder="Confirm Password" required>
      </div>
      <button type="submit">Sign Up</button>
    </form>
  </div>
</template>

<script>
import LayoutHeader from './LayoutHeader.vue';

export default {
  name: 'SignUp',
  components:{
    LayoutHeader
  },
  data() {
    return {
      user: {
        email: '',
        password: '',
        confirmPassword: ''
      },
    };
  },
  methods: {
    submitForm() {
      // Here you would implement form submission logic,
      // potentially validating the input and then sending it to a server
      console.log('Form submitted', this.user);
    }
  }
}
</script>

<style scoped>
.signup-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* or use 'min-height' if within another container */
  background: url('path-to-your-background-image.jpg') no-repeat center center fixed; 
  background-size: cover;
}

.signup-form {
  padding: 1em;
  background: white;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}
h1 {
    font-size:12px;
    margin-left:50%;
    
}
p {
    margin-left:50%;
    font-size:18px;
    font-weight:bolder;

}
.form-group{
    margin-top:2%;
    margin-right: 20%;
}
 
label{
    font-size:13px;
    display: inline-block;
    text-align: left;
    width:180px;
}

#email, #password, #confirm-password{
    width:230px;
    height:30px;
    margin-left:8%;
    box-shadow: none;
    border: 1px solid #FF6E05;
    border-radius:8px;

}
input::placeholder{
    text-indent: 3px;
}

button{
    width:230px;
    height:30px;
    margin-top:8%;
    border:0;
    border-radius: 8px;
    background-color: #F2C54E;
    margin-right:2%;
    font-weight: bolder;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}
</style>