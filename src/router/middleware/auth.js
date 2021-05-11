export default function auth ({ next, store }) {
    if (!store.getters['auth/authenticated']) {
        return next({ name: 'auth.signin' })
    }
    return next()
}