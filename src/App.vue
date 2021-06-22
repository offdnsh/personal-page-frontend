<template>
    <div>
        <AppSnackbar />
        <div class="bg-section"></div>
        <AppMenu />
        <transition name="fade" mode="out-in">
            <router-view />
        </transition>

    </div>
</template>

<script>
import AppMenu from './components/app/AppMenu'
import AppSnackbar from "./components/app/AppSnackbar";
export default {
    name: 'App',
    components: {AppSnackbar, AppMenu}
}
</script>

<style>
body, h1, h2, h3, h4, h5, .ui {
    font-family: 'SF UI Text', 'Nunito', 'Segoe UI', sans-serif !important;
    letter-spacing: .5px !important;
}

.bg-section {
    background: url(https://www.ulsu.ru/static/img/bg_section-big.svg) top right no-repeat !important;
    width: 1458px;
    height: 822px;
    z-index: -1;
    position: absolute;
    opacity: .3;
    top: -5em;
    right: -12em;
    background-size: cover;
}

body {
    height: 100%;
}

i.icon {
    font-family: Icons;
}

.ui.form input:not([type]), .ui.form input[type=date], .ui.form input[type=datetime-local], .ui.form input[type=email], .ui.form input[type=file], .ui.form input[type=number], .ui.form input[type=password], .ui.form input[type=search], .ui.form input[type=tel], .ui.form input[type=text], .ui.form input[type=time], .ui.form input[type=url] {
    font-family: 'SF UI Text', 'Nunito', 'Segoe UI', sans-serif !important;
    letter-spacing: .5px !important;
}

.fade-enter-active,
.fade-leave-active {
    transition-duration: 0.3s;
    transition-property: opacity;
    transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
    opacity: 0
}
</style>