// import ElementPlus globally
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import router from '@/router'

const app = createApp(App)

app.use(ElementPlus) // Use ElementPlus components
app.use(router) // Register router
app.mount('#app')
