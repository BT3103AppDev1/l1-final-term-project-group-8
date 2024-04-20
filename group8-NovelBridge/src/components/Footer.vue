<template>
    <footer class="site-footer">
      <nav class="footer-nav">
        <ul>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/faq">FAQ</router-link></li>
          <li><router-link to="/contact">Contacts</router-link></li>
        </ul>
      </nav>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
  <style scoped>
  .site-footer {
    background-color: #f8f8f8;
    padding: 20px 0;
    text-align: center;
    border-top: 1px solid #e7e7e7;
  }
  
  .footer-nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  .footer-nav li {
    display: inline;
    margin: 0 10px;
  }
  
  .footer-nav a {
    text-decoration: none;
    color: #333;
  }
  
  .footer-nav a:hover {
    text-decoration: underline;
  }
  </style>
  