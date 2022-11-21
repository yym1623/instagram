// 환경변수(.env)로 DB 로컬/서버 분기처리하기



import { createApp } from 'vue'

import App from './App.vue'

// plugin
import router from './routers/index.js'

createApp(App).use(router).mount('#app')
