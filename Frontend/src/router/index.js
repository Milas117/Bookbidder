import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import CreateAuction from '../views/CreateAuction.vue'
import MyAuctions from '../views/MyAuctions.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/create_auction',
      name: 'create_auction',
      component: CreateAuction
    },
    {
      path: '/my_auctions',
      name: 'my_auctions',
      component: MyAuctions
    }
  ]
})

export default router
