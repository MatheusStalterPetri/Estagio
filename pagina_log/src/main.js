import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '/node_modules/apex-grid/dist/apex-grid.min.css';
import '@/assets/dashboard.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
