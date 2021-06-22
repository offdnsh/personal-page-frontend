import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import './assets/styles/app.css'
import axios from 'axios'
import VueMeta from 'vue-meta'
import VueMask from 'v-mask'

import AOS from 'aos'
import 'aos/dist/aos.css'

document.title = 'Загрузка страницы ...'

require('./store/subscriber')

axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/'

Vue.config.productionTip = false

Vue.use(SuiVue)
Vue.use(VueMask);
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
})


Vue.filter('formated_date', (value, format = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    minute: 'numeric',
    hour: 'numeric'
}) => {
    try {
        const date = new Date(value * 1000)

        return new Intl.DateTimeFormat('ru-RU', format).format(date)
    } catch (e) {
        throw e
    }
})

store.dispatch('auth/attempt', JSON.parse(localStorage.getItem('token'))).then(() => {
    new Vue({
        router,
        store,
        render: h => h(App),
        created() {
            AOS.init()
        }
    }).$mount('#app')
})

