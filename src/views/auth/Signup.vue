<template>
    <div>
        <sui-container style="padding: 0 0.9em;">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="6">
                        <h3 style="font-weight: 800;margin-bottom: 32px;">Присоединиться к нам.</h3>
                        <p style="line-height: 26px;margin-bottom: 32px;">Рады видеть вас на платформе где преподаватели размещают о себе информацию.</p>
                        <sui-segment vertical>
                            <sui-dimmer :active="loading" inverted>
                                <sui-loader size="small">Загрузка ...</sui-loader>
                            </sui-dimmer>
                            <sui-form @submit.prevent="onSubmit">
                                <sui-form-field required>
                                    <label>Имя</label>
                                    <input type="text" name="first_name" v-model="form.first_name" placeholder="Введите ваше имя" />
                                    <span class="error" v-if="errors.first_name">{{ errors.first_name[0] }}</span>
                                </sui-form-field>
                                <sui-form-field required>
                                    <label>Фамилия</label>
                                    <input type="text" name="last_name" v-model="form.last_name" placeholder="Введите вашу фамилию" />
                                    <span class="error" v-if="errors.last_name">{{ errors.last_name[0] }}</span>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>Отчество</label>
                                    <input type="text" name="patronymic" v-model="form.patronymic" placeholder="Введите ваше отчество" />
                                    <span class="error" v-if="errors.patronymic">{{ errors.patronymic[0] }}</span>
                                </sui-form-field>
                                <sui-form-field required>
                                    <label>Имя пользователя</label>
                                    <input type="text" name="username" v-model="form.username" placeholder="Введите ваше имя пользователя" />
                                    <span class="error" v-if="errors.username">{{ errors.username[0] }}</span>
                                </sui-form-field>
                                <sui-form-field required>
                                    <label>Электронная почта</label>
                                    <input type="text" name="email" v-model="form.email" placeholder="Введите вашу электронную почту" />
                                    <span class="error" v-if="errors.email">{{ errors.email[0] }}</span>
                                </sui-form-field>
                                <sui-form-field required>
                                    <label>Пароль</label>
                                    <input type="password" name="password" v-model="form.password" placeholder="Введите ваш пароль" />
                                    <span class="error" v-if="errors.password">{{ errors.password[0] }}</span>
                                </sui-form-field>
                                <sui-button primary>Присоединиться</sui-button>
                            </sui-form>
                        </sui-segment>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>

<script>
import User from '../../modules/User'
import {mapActions} from 'vuex'

export default {
    name: `Signup`,
    metaInfo: {
        title: 'Присоединиться к нам'
    },
    data: () => ({
        form: {
            first_name: '',
            last_name: '',
            patronymic: '',
            username: '',
            email: '',
            password: ''
        },
        loading: false,
        errors: []
    }),
    methods: {
        ...mapActions({
            attempt: 'auth/attempt'
        }),
        onSubmit () {
            this.loading = true
            this.errors = []
            User.signup(this.form).then(response => {
                this.attempt(response.data.token).then(() => {
                    this.$router.replace({ name: 'home' })
                })
            }).catch(error => {
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors
                    this.loading = false
                }
            })
        }
    }
}
</script>

<style scoped>

</style>