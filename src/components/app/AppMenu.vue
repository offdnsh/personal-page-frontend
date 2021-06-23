<template>
    <div data-aos="fade-down" style="margin-top: 32px;margin-bottom: 5em;">
        <sui-container>
            <sui-menu secondary style="border-bottom: solid 1px #eaedef;padding-bottom: 40px;">
                <router-link is="sui-menu-item" style="font-weight: bold;margin-left: 0 !important;" :to="{ name: 'home' }">Elgeria</router-link>
                <router-link is="sui-menu-item" :to="{ name: 'search' }">Преподаватели</router-link>
                <sui-menu-menu position="right">
                    <template v-if="authenticated">
                        <router-link is="sui-menu-item" :to="{ name: 'users.profile', params: {'username': user.username} }">Мой профиль</router-link>
                        <router-link is="sui-menu-item" :to="{ name: 'account.settings' }">Настройки</router-link>
                        <router-link is="sui-menu-item" :to="{ name: 'account.files' }">Файлы</router-link>
                        <a is="sui-menu-item" @click="onLogout"><span style="color: red;">Выход</span></a>
                    </template>
                    <template v-else>
                        <router-link is="sui-menu-item" :to="{ name: 'auth.signin' }">Войти</router-link>
                        <router-link is="sui-menu-item" style="color: #6435C9;font-weight: bold;margin-right: 0 !important" :to="{ name: 'auth.signup' }">Присоединиться <span style="margin-left: 10px;">✨</span></router-link>
                    </template>
                </sui-menu-menu>
            </sui-menu>
        </sui-container>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

export default {
    name: 'AppMenu',
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated',
            user: 'auth/user'
        })
    },
    methods: {
        ...mapActions({
            logout: 'auth/logout'
        }),
        onLogout () {
            this.logout().then(() => {
                if (this.$route.path !== '/') this.$router.replace({ name: 'home' })
            })
        }
    }
}
</script>

<style scoped>

</style>