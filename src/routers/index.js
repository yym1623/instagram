import { createRouter, createWebHashHistory } from 'vue-router'

// components
import Home from '../view/Home.vue'
import Login from '../view/Login.vue'
import Regster from '../view/Regster.vue'

export default createRouter({
  scrollBehavior() {
    return { top : 0 }
  },

  // hash version
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: "Login",
      component: Login
    },
    {
      path: '/home',
      name: "Home",
      component: Home
    },
    {
      path: '/regster',
      name: "Regster",
      component: Regster
    }
  ]
})