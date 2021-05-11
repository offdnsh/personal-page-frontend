<template>
    <sui-grid-column :width="4">
        <strong>Аккаунт</strong>
        <sui-list style="margin-top: 2em;margin-bottom: 2em;">
            <router-link is="sui-list-item" style="padding: 12px 18px;" :to="{ name: 'account.settings' }">Настройки</router-link>
        </sui-list>
        <strong>Публичный профиль</strong>
        <sui-list style="margin-top: 2em;">
            <router-link is="sui-list-item" style="padding: 12px 18px;" :to="{ name: 'account.profile' }">Настройки</router-link>
            <router-link is="sui-list-item" style="padding: 12px 18px;" :to="{ name: 'account.profile.social' }">Социальные сети</router-link>
        </sui-list>
    </sui-grid-column>
</template>

<script>
export default {
    name: 'SettingsListMenu'
}
</script>

<style scoped>

</style>