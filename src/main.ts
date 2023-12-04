// import ElementPlus globally
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from '@/App.vue'
import router from '@/router'
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App)

app.use(ElementPlus) // Use ElementPlus components
app.use(router) // Register router
app.use(VueApexCharts);
app.mount('#app')


