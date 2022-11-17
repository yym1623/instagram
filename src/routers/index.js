import { createRouter, createWebHashHistory } from 'vue-router'

// components
import Home from './Home.vue'

export default createRouter({
  // scrollBehavior() {
  //   return { top : 0 }
  // }

  // hash version
  history : createWebHashHistory(),
  routers: [
    {
      path: '/',
      name: "Home",
      component: Home
    }
  ]
})