import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import SuiVue from 'semantic-ui-vue'
import 'semantic-ui-css/semantic.min.css'
import axios from 'axios'
import './assets/styles/app.css'
import VueMeta from 'vue-meta'

require('./store/subscriber')

axios.defaults.baseURL = process.env.VUE_APP_API_URL || 'http://127.0.0.1:8000/api/'

Vue.config.productionTip = false

Vue.use(SuiVue)
Vue.use(VueMeta, {
    refreshOnceOnNavigation: true
})

store.dispatch('auth/attempt', JSON.parse(localStorage.getItem('token'))).then(() => {
    new Vue({
        router,
        store,
        render: h => h(App)
    }).$mount('#app')
})
