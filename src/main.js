import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios'

createApp(App).mount('#app')

axios.defaults.baseURL = process.env.VUE_APP_API_URL_BASE
