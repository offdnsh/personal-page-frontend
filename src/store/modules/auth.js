import axios from 'axios'
import User from "../../modules/User";

export default {
    namespaced: true,

    state: {
        token: null,
        user:null
    },
    getters: {
        authenticated (state) {
            return !! (state.user && state.token)
        },
        user (state) {
            return state.user
        }
    },
    mutations: {
        setToken (state, payload) {
            state.token = payload
        },
        setUser (state, payload) {
            state.user = payload
        }
    },
    actions: {
        async attempt({ commit, state }, token) {
            if (token) commit('setToken', token)

            if (!state.token) return

            try {
                const response = await User.me()
                commit('setUser', response.data)
            } catch (e) {
                commit('setToken', null)
                commit('setUser', null)
            }
        },
        async logout ({ commit }) {
            return await User.logout().then(() => {
                commit('setToken', null)
                commit('setUser', null)
            })
        },
        async refreshUserData ({ commit }) {
            try {
                const response = await User.me()
                commit('setUser', response.data)
            } catch (e) {
                commit('setToken', null)
                commit('setUser', null)
            }
        }
    }
}