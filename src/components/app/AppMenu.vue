<template>
    <div style="margin-top: 32px;margin-bottom: 5em;">
        <sui-container>
            <sui-menu secondary>
                <router-link is="sui-menu-item" style="font-weight: bold;margin-left: 0 !important;" :to="{ name: 'home' }">Elgeria</router-link>
                <router-link is="sui-menu-item" :to="{ name: 'home' }">О проекте</router-link>
                <router-link is="sui-menu-item" :to="{ name: 'home' }">Преподаватели</router-link>
                <sui-menu-menu position="right">
                    <template v-if="authenticated">
                        <sui-dropdown text="Аккаунт">
                            <sui-dropdown-menu style="min-width: 170px;animation-duration: 0s !important">
                                <router-link is="sui-dropdown-item" :to="{ name: 'users.profile', params: {'username': user.username} }">Мой профиль</router-link>
                                <router-link is="sui-dropdown-item" :to="{ name: 'account.settings' }">Настройки</router-link>
                                <router-link is="sui-dropdown-item" :to="{ name: 'account.files' }">Файлы</router-link>
                                <sui-dropdown-item>Помощь</sui-dropdown-item>
                                <sui-dropdown-divider />
                                <sui-dropdown-item @click="onLogout"><span style="color: red;">Выйти</span></sui-dropdown-item>
                            </sui-dropdown-menu>
                        </sui-dropdown>
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
                this.$router.replace({ name: 'home' })
            })
        }
    }
}
</script>

<style scoped>

</style>