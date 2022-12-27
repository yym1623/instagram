import { createApp, nextTick } from 'vue'
import App from './App.vue'
// plugin
import router from './routers/index.js'
import vueCookies from "vue-cookies";

import store from './store/index.js'

// afterEach - router 설정파일에 접근할 수 있다 (반복문으로 전체접근)
router.afterEach((to, from) => {
  const title = to.meta.title === undefined ? 'instagram' : to.meta.title;
  nextTick(() => {
    document.title = title;
  });
});

createApp(App).use(router).use(store).use(vueCookies).mount('#app')