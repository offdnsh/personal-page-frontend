<template>
    <div>
        <sui-container style="padding: 0 0.9em;">
            <sui-grid>
                <sui-grid-row>
                    <SettingsListMenu />
                    <sui-grid-column :width="6">
                        <h4 style="margin-bottom: 3em;">Настройки аккаунта</h4>
                        <sui-segment vertical>
                            <sui-form @submit.prevent="onSaveChange">
                                <sui-dimmer :active="loading" inverted>
                                    <sui-loader size="small">Загрузка ...</sui-loader>
                                </sui-dimmer>
                                <sui-grid style="margin-bottom: 1.3em;">
                                    <sui-grid-row>
                                        <sui-grid-column :width="4">
                                            <div class="photo-border">
                                                <img :src="user.photo" ref="photo" :alt="user.username">
                                            </div>
                                        </sui-grid-column>
                                        <sui-grid-column :width="12">
                                            <label for="upload-file" class="file-loader">
                                                <input type="file" id="upload-file" accept="image/*" @change="onChooseFile($event)" ref="file" hidden>
                                                <span ref="filename">Нажмите для выбора файла</span>
                                            </label>
                                        </sui-grid-column>
                                    </sui-grid-row>
                                </sui-grid>
                                <sui-form-field required>
                                    <label>Имя</label>
                                    <input type="text" name="first_name" v-model="form.first_name"  />
                                    <span class="error" v-if="errors.first_name">{{ errors.first_name[0] }}</span>
                                </sui-form-field>
                                <sui-form-field required>
                                    <label>Фамилия</label>
                                    <input type="text" name="last_name" v-model="form.last_name"  />
                                    <span class="error" v-if="errors.last_name">{{ errors.last_name[0] }}</span>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>Отчество</label>
                                    <input type="text" name="patronymic" v-model="form.patronymic"  />
                                    <span class="error" v-if="errors.patronymic">{{ errors.patronymic[0] }}</span>
                                </sui-form-field>
                                <sui-form-field required>
                                    <label>Имя пользователя</label>
                                    <input type="text" name="username" v-model="form.username"  />
                                    <span class="error" v-if="errors.username">{{ errors.username[0] }}</span>
                                </sui-form-field>
                                <sui-button primary>Сохранить изменения</sui-button>
                            </sui-form>
                        </sui-segment>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>

<script>
import SettingsListMenu from './components/SettingsListMenu'
import {mapActions, mapGetters} from 'vuex'
import Account from '../../modules/Account'

export default {
    name: 'Settings',
    metaInfo: {
        title: 'Настройки'
    },
    components: { SettingsListMenu },
    data: () => ({
        loading: false,
        form: {
            first_name: ''
        },
        errors: []
    }),
    mounted() {
        this.form = {
            first_name: this.user.first_name,
            last_name: this.user.last_name,
            patronymic: this.user.patronymic || '',
            username: this.user.username,
        }
    },
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    },
    methods: {
        ...mapActions({
            refreshUserData: 'auth/refreshUserData'
        }),
        onSaveChange () {
            this.loading = true
            this.errors = []

            Account.updateSettings(this.form).then(response => {
                this.refreshUserData()
                this.loading= false
            }).catch(error => {
                if (error.response.status === 422) {
                    this.errors = error.response.data.errors
                    this.loading = false
                }
            })
        },
        onChooseFile (e) {
            if (e.target.files.length) {
                this.loading = true
                const file = e.target.files[0]
                this.$refs.filename.innerHTML = file.name

                const fm = new FormData
                fm.append('photo', file)

                Account.uploadPhoto(fm).then(response => {
                    this.$refs.photo.src = response.data.url
                    this.refreshUserData()
                    this.$refs.filename.innerHTML = 'Нажмите для выбора файла'
                    this.loading = false
                }).catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors
                        this.$refs.filename.innerHTML = 'Нажмите для выбора файла'
                        this.loading = false
                    }
                })
            }
        }
    }
}
</script>

<style scoped>

</style>