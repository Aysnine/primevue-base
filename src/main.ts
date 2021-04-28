import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import '@icon-park/vue-next/styles/index.css'
import 'virtual:windi.css'
import './main.css'

createApp(App).use(router).use(PrimeVue).mount('#app')
