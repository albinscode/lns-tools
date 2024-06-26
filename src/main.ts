import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// Plugins
import { registerPlugins } from '@/plugins'


const app = createApp(App)
    .use(store)
    .use(router)

registerPlugins(app)

app.mount('#app')
