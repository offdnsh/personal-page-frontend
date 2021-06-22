export default {
    namespaced: true,

    state: {
        snack: null
    },
    getters: {
        snack (state) {
            return state.snack
        }
    },
    mutations: {
        setSnack (state, payload) {
            state.snack = {
                text: payload.text,
                type: payload.type
            }
        },
        setNullStack (state) {
            state.snack = null
        }
    },
    actions: {
        snack ({ commit }, payload) {
            commit('setSnack', payload)

            setTimeout(() => {
                commit('setNullStack')
            }, 2800)
        }
    }
}