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
* {
    font-family: 'Nunito', 'Segoe UI', sans-serif !important;
    letter-spacing: .5px !important;
}
</style>