import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import store from './stores'
import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia).use(router).use(store)
app.mount('#app')
