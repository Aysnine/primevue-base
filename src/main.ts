import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'

import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import '@icon-park/vue-next/styles/index.css'
import 'virtual:windi.css'
import './main.css'

const app = createApp(App).use(router).use(PrimeVue)

import('./mock').then(({ makeServer }) => {
  makeServer({ environment: import.meta.env.MODE })
  app.mount('#app')
})
