import { createApp } from 'vue'
import App from './App.vue'
import { i18n, initLocaleSync } from './i18n'
import './styles/main.scss'

initLocaleSync()

createApp(App)
	.use(i18n)
	.mount('#app')
