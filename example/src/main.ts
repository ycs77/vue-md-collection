import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import collector from 'virtual:collector'

createApp(App)
  .use(router)
  .use(collector)
  .mount('#app')
