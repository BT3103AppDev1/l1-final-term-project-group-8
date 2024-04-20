<template>
    <div class="about-container">
      <div class="about-slogan">
        <p>Novel Bridge,</p>
        <p>More than you wish</p>
      </div>
      
      <h1 class="about-title">About</h1>
      
      <div class="how-to-use">
        <h2>How to use Novel Bridge?</h2>
        <div class="usage-instructions">
          <div class="instruction">
            <h3>Find</h3>
            <p>Find the novel you are interested in</p>
          </div>
          <div class="instruction"> 
            <h3>Translate</h3>
            <p>Choose your preferred language and enjoy the novel that is automated translated</p>
          </div>
          <div class="instruction">
            <h3>Save</h3>
            <p>Save the novel you are interested in the favorite section or add it to bookmarked where your reading progress will be tracked</p>
          </div>
        </div>
      </div>
      
      <div class="about-contact">
        <p>Contact us: enquiries@novelbridge.com</p>
    </div>

    </div>
  </template>
  
  <script>
  export default {
    name: 'about'
  }
  </script>
  
  <style scoped>
  .about-container {
    background-color: #f5f5f5; /* Adjust the background color as needed */
    background:#fff url(https://i.imgur.com/FaNoH6x.png);
    background-size: 100%;
    box-shadow: 0 12px 67px 0 rgba(0,0,0,.04);
    color: #333; /* Text color */
    padding: 2rem;
    text-align: center;
  }
  
  .about-slogan p {
    margin: 0;
    font-style: italic;
    font-size: large;
  }
  
  .about-title {
    font-size: 3rem;
    margin-top: 1rem;
    font-weight: bold;
  }
  
  .how-to-use {
    margin-top: 3rem;
  }
  
  .how-to-use h2 {
    font-size: 1.5rem;
  }
  
  .usage-instructions {
    display: flex;
    justify-content: space-around;
    margin-top: 2rem;
  }
  
  .instruction h3 {
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    font-weight: bold;
  }
  
  .instruction p {
    max-width: 200px;
  }
  
  .about-contact {
    margin-top: 3rem;
    font-weight: bold;
    font-size: larger;
  }


  </style>
  