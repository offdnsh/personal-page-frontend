import axios from 'axios'

async function signup(data) {
    return await axios.post('auth/signup', data)
}

async function signin(data) {
    return await axios.post('auth/signin', data)
}

async function me() {
    return await axios.get('auth/me')
}

async function logout() {
    return await axios.post('auth/logout')
}

async function showProfile(username) {
    return await axios.get(`u/${username}`)
}

export default {
    signup,
    signin,
    me,
    logout,
    showProfile
}