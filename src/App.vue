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

.ui.form input:not([type]), .ui.form input[type=date], .ui.form input[type=datetime-local], .ui.form input[type=email], .ui.form input[type=file], .ui.form input[type=number], .ui.form input[type=password], .ui.form input[type=search], .ui.form input[type=tel], .ui.form input[type=text], .ui.form input[type=time], .ui.form input[type=url] {
    font-family: 'Nunito', 'Segoe UI', sans-serif !important;
    letter-spacing: .5px !important;
}
</style>