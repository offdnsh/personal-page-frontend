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
body, h1, h2, h3, h4, h5, .ui {
    font-family: 'Nunito', 'Segoe UI', sans-serif !important;
    letter-spacing: .5px !important;
}

i.icon {
    font-family: Icons;
}
</style>