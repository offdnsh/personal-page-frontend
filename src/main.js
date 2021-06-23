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

const plural = require('plural-ru');

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

        let date = Date.now();

        if (typeof value === 'number') {
            date = new Date(value * 1000)
        } else {
            date = new Date(value)
        }

        return new Intl.DateTimeFormat('ru-RU', format).format(date)
    } catch (e) {
        throw e
    }
})

Vue.filter('plural', (num, ...args) => {
    return plural(num, args);
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


