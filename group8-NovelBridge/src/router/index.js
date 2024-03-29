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
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router