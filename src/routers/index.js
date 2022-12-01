import { createRouter, createWebHashHistory } from 'vue-router'

// components
import Home from '../view/Home.vue'
import Login from '../view/Login.vue'
import Regster from '../view/Regster.vue'
import Explore from '../view/Explore.vue'
import Message from '../view/Message.vue'
import User from '../view/User.vue'

export default createRouter({
  scrollBehavior() {
    return { top : 0 }
  },

  // hash version
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: "Home",
      component: Home
    },
    {
      path: '/login',
      name: "Login",
      component: Login
    },
    {
      path: '/regster',
      name: "Regster",
      component: Regster
    },
    {
      path: '/explore',
      name: "Explore",
      component: Explore
    },
    {
      path: '/message/:id?',
      name: "Message",
      component: Message,
      meta: {
        title: '받은 메세지함'
      }
    },
    {
      path: '/:id',
      name: "User",
      component: User,
      meta: {
        title: '이름(닉네임)'
      }
    }
  ]
})