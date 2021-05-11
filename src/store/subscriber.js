import store from '../store'
import axios from 'axios'

store.subscribe((mutation) => {
    switch(mutation.type) {
        case 'auth/setToken':
            if (mutation.payload != null) {
                axios.defaults.headers.common['Authorization'] = `${mutation.payload.type} ${mutation.payload.value}`
                localStorage.setItem('token', JSON.stringify(mutation.payload))
            } else {
                axios.defaults.headers.common['Authorization'] = null
                localStorage.removeItem('token')
            }
            break;
    }
})