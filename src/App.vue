<template>
    <div>
        <AppMenu />
        <router-view />
    </div>
</template>

<script>
import AppMenu from './components/app/AppMenu'
export default {
    name: 'App',
    components: {AppMenu}
}
</script>

<style>
@import "assets/styles/app.css";
</style>