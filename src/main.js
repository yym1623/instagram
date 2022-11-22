import { createApp } from 'vue'

import App from './App.vue'

// plugin
import router from './routers/index.js'

// prototype
// import axios from 'axios'
// vue.prototype.$http=axios;

createApp(App).use(router).mount('#app')
