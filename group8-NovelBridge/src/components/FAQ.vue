<template>
    <div class="faq-container">
      <div class="faq-header">
        <h2>Novel Bridge,</h2>
        <p>More than you wish</p>
        <h1>FAQs</h1>
      </div>
      
      <div class="faq-item" v-for="(item, index) in faqItems" :key="index">
        <button class="faq-question" @click="toggle(index)">
          {{ item.question }}
          <span class="faq-icon">{{ item.open ? '▼' : '►' }}</span>
        </button>
        <div class="faq-answer" v-show="item.open">
          <p>{{ item.answer }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FAQ',
    data() {
      return {
        faqItems: [
          {
            question: 'How do I create an account on the website?',
            answer: 'To create an account, simply click on the "Sign Up" button on the homepage. Fill in the required information, such as your email address and a password, and click "Sign Up." You will receive a confirmation email to activate your account.',
            open: false,
          },
          {
            question: 'How do I search for novels on the website?',
            answer: 'You can search for novels using the search bar located at the top of the website. Simply enter keywords, such as the title, author, or genre of the novel you are looking for, and click the search icon. You can also use the filters and categories provided to narrow down your search results in the Library page.',
            open: false,
          },
          {
            question: 'Is there a cost associated with reading novels on the website?',
            answer: 'Our website offers a wide range of novels that are available for free.',
            open: false,
          },
          {
            question: 'How do I report an issue with a novel or the website?',
            answer: 'If you encounter any issues while reading a novel or navigating the website, please contact our support team by going to the "Contact Us" section. Provide a detailed description of the problem, and we will address it as promptly as possible.',
            open: false,
          },
          {
            question: 'Can I download novels to read offline?',
            answer: 'Yes, some of our novels are available for download so that you can enjoy reading them offline. Look for the download icon next to the novel description. Please note that this feature may be available only to registered users or subscribers.',
            open: false,
          },
          // Add more FAQs as needed
        ],
      };
    },
    methods: {
      toggle(index) {
        this.faqItems[index].open = !this.faqItems[index].open;
      },
    },
  };
  </script>
  
  <style scoped>
  .faq-container {
    background:#fff url(https://i.imgur.com/FaNoH6x.png);
    background-size: 100%;
    color: #333; /* Text color */
    padding: 2rem;
    text-align: center;
  }
  
  .faq-header h2 {
    margin: 0;
    font-style: italic;
    font-size: large;
  }

  .faq-header h1 {
    font-weight: bold;
  }
  
  .faq-header p {
    font-style: italic;
    font-size: large;
  }
  
  .faq-item {
    margin-top: 20px;
  }
  
  .faq-question {
    background: none;
    border: none;
    text-align: left;
    width: 100%;
    padding: 10px 0;
    font-size: 1.25em;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .faq-icon {
    transition: transform 0.3s ease; /* Smooth transition for icon rotation */
  }
  
  /* Rotate the icon when the answer is open */
  .faq-item.open .faq-icon {
    transform: rotate(180deg);
  }
  
  .faq-answer {
    text-align: left;
    font-size: medium;
    padding: 0 15px 15px 15px;
    overflow: hidden; /* In case of height transition */
  }
  
  /* Remove this style to allow v-show to handle the display property
  .faq-answer[style*="display: none;"] {
    display: block;
  }
  */
  </style>
  