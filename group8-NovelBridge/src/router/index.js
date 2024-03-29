import {createRouter, createWebHistory} from 'vue-router'
import Homepage from '@/Views/Homepage.vue'
import SignUp from '@/components/SignUp.vue'

const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: Homepage
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
      }
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
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router
