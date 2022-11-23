import { createApp } from 'vue'
import App from './App.vue'
// plugin
import router from './routers/index.js'
import vueCookies from "vue-cookies";

// prototype
// import axios from 'axios'
// vue.prototype.$http=axios;

createApp(App).use(router).use(vueCookies).mount('#app')