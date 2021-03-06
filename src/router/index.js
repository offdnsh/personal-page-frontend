import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import middlewarePipeline from './middlewarePipeline'
import auth from './middleware/auth'

import Home from '../views/Home.vue'
import Signup from '../views/auth/Signup'
import Signin from '../views/auth/Signin'
import Settings from '../views/account/Settings'
import UserProfile from "../views/user/UserProfile";
import Files from "../views/account/Files";
import Search from "../views/Search";
import Profile from "../views/user/Profile";
import NotFound from "../views/account/NotFound";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/auth/signup',
        name: 'auth.signup',
        component: Signup
    },
    {
        path: '/auth/signin',
        name: 'auth.signin',
        component: Signin
    },
    {
        path: '/account/settings',
        name: 'account.settings',
        component: Settings,
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/u/:username',
        name: 'users.profile',
        component: Profile
    },
    {
        path: '/account/files',
        name: 'account.files',
        component: Files,
        meta: {
            middleware: [
                auth
            ]
        }
    },
    {
        path: '/search',
        name: 'search',
        component: Search
    },
    {
        path: '*',
        component: NotFound
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware
    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default router
