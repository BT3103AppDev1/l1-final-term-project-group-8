import {createRouter, createWebHistory} from 'vue-router'
import Homepage from '@/Views/Homepage.vue'
import SignUp from '@/components/SignUp.vue'
import BookMarked from '@/Views/BookMarked.vue'
import Completed from '@/components/Completed.vue'
import Ongoing from '@/components/Ongoing.vue'
import Unread from '@/components/Unread.vue'
import Login from '@/components/Login.vue'
import UserProfile from '@/components/UserProfile.vue'
import Library from '@/Views/Library.vue'
import BookDetail from '@/components/BookDetail.vue'
import Reading from '@/components/Reading.vue'



const routes = [
    {
        path: '/',
        name: 'Homepage',
        component: Homepage
      },
      {
        path: '/bookmarked',
        name: 'BookMarked',
        component: BookMarked
      },
      {
        path: '/library',
        name: 'Library',
        component: Library
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
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/signup',
        name: 'SignUp',
        component: SignUp
      },
      {
        path: '/userprofile',
        name: 'UserProfile',
        component: UserProfile
      },
      {
        path:'/library',
        name:'Library',
        component: Library,
        props: (route) => ({category: route.query.category})
      },
      {
        path: '/bookdetail/:id',
        name: 'BookDetail',
        component: BookDetail,
        props: true,
      },
      {
        path: '/read/:id/:chapter',
        name: 'ReadingPanel',
        component: Reading,
        props: true,
      },
      
]

const router = createRouter({
    history:createWebHistory(),
    routes
})

export default router
