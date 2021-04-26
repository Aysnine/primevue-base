import { createApp } from 'vue'
import App from './App.vue'
import PrimeVue from 'primevue/config'

import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'virtual:windi.css'

createApp(App).use(PrimeVue).mount('#app')
