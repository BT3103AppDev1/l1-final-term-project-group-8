import { createRouter, createWebHistory } from 'vue-router';
import Completed from '@/components/Completed.vue';
import Ongoing from '@/components/Ongoing.vue';
import Unread from '@/components/Unread.vue';
import Bookmarked from '@/Views/BookMarked.vue';

const routes = [
  {
    path: '/',
    redirect: '/completed',
  },
  {
    path: '/completed',
    name: 'Completed',
    component: Completed
  },
  {
    path: '/ongoing',
    name: 'Ongoing',
    component: Ongoing
  },
  {
    path: '/unread',
    name: 'Unread',
    component: Unread
  },
  {
    path: '/bookmarked',
    name: 'BookMarked',
    component: Bookmarked,
  },
  // ... other routes
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
