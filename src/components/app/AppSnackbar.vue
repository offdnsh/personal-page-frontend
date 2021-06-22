<template>
    <transition
        enter-class="snack-enter"
        enter-to-class="snack-enter-to"
        leave-to-class="snack-leave-to"
    >
        <div class="app-snackbar" :class="getClassByType" v-if="snack">
            <div class="app-snackbar__flex">
                <div>
                    <sui-icon :name="getIconNameByType" size="big" :color="getIconColorByType" />
                </div>
                <div>
                    <strong class="title">{{ getTitleByType }}</strong>
                    {{ snack.text }}
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "AppSnackbar",
    computed: {
        ...mapGetters({
            snack: 'snack/snack'
        }),
        getClassByType () {
            const type = this.snack.type || 'default'

            switch (type) {
                case 'danger':
                    return 'app-snackbar__danger'
                case 'primary':
                    return 'app-snackbar__primary'
                default:
                    return 'app-snackbar__default'
            }
        },
        getTitleByType () {
            const type = this.snack.type || 'default'

            switch (type) {
                case 'danger':
                    return 'Ошибка'
                default:
                    return 'Информация'
            }
        },
        getIconNameByType () {
            const type = this.snack.type || 'default'

            switch (type) {
                case 'danger':
                    return 'exclamation triangle'
                default:
                    return 'info'
            }
        },
        getIconColorByType () {
            const type = this.snack.type || 'default'

            switch (type) {
                case 'danger':
                    return 'red'
                default:
                    return 'blue'
            }
        }
    }
}
</script>

<style scoped>
.app-snackbar {
    z-index: 99;
    position: absolute;
    right: 3em;
    top: 32px;
    padding: 20px 24px;
    background: #fff;
    border-left: solid 3px transparent;
    box-shadow: 0 0 2px rgba(0,0,0,.3);
}

.app-snackbar .title {
    display: block;
    margin-bottom: 12px;
    font-weight: 600;
}

.app-snackbar .app-snackbar__flex {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.app-snackbar .app-snackbar__flex div:first-child {
    margin-right: 32px;
    width: 30px;
}

.app-snackbar__danger {
    border-color: #D14343;
}

.app-snackbar__danger .icon svg {
    background: #D14343;
}

.snack-enter {
    transform: translateY(-10em);
}

.snack-enter-to {
    transform: translateY(0);
    transition: all .6s ease-in-out;
}

.snack-leave {
    transform: translateY(-10em);
}

.snack-leave-to {
    transition: all .5s ease-in-out;
    transform: translateY(-10em);
}

</style>