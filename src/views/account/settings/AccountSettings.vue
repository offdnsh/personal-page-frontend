<template>
    <sui-grid-row>
        <sui-grid-column :width="10">
            <sui-segment vertical>
                <sui-dimmer :active="loading" inverted>
                    <sui-loader size="small">Загрузка ...</sui-loader>
                </sui-dimmer>
                <sui-form @submit.prevent="onSaveChange">
                    <div class="panel">
                        <div class="panel-body">
                            <sui-form-field>
                                <label for="">Фотография</label>
                                <input type="file" id="upload-file" accept="image/*" @change="onChooseFile($event)" ref="file" style="width: 320px;">
                            </sui-form-field>
                            <sui-form-field required>
                                <label>Имя пользователя</label>
                                <input type="text" style="width: 70%" name="username" v-model="form.username"  />
                                <span class="error" v-if="errors.username">{{ errors.username[0] }}</span>
                            </sui-form-field>
                            <sui-form-field required>
                                <label>Имя</label>
                                <input type="text" style="width: 70%" v-model="form.first_name"  />
                                <span class="error" v-if="errors.first_name">{{ errors.first_name[0] }}</span>
                            </sui-form-field>
                            <sui-form-field required>
                                <label>Фамилия</label>
                                <input type="text" style="width: 70%" v-model="form.last_name"  />
                                <span class="error" v-if="errors.last_name">{{ errors.last_name[0] }}</span>
                            </sui-form-field>
                            <sui-form-field>
                                <label>Отчество</label>
                                <input type="text" style="width: 70%" v-model="form.patronymic"  />
                                <span class="error" v-if="errors.patronymic">{{ errors.patronymic[0] }}</span>
                            </sui-form-field>
                        </div>
                        <div class="panel-footer">
                            <sui-button primary>Сохранить</sui-button>
                        </div>
                    </div>
                </sui-form>
            </sui-segment>
        </sui-grid-column>
    </sui-grid-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Account from "../../../modules/Account";

export default {
    name: "AccountSettings",
    data: () => ({
        loading: false,
        form: {
            first_name: '',
            last_name: '',
            patronymic: '',
            username: ''
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
            refreshUserData: 'auth/refreshUserData',
            snack: 'snack/snack'
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

                const fm = new FormData
                fm.append('photo', file)

                Account.uploadPhoto(fm).then(response => {
                    this.refreshUserData()
                    this.$refs.file.value = null
                    this.snack({
                        text: 'Фотография была успешно ообновлена.',
                        type: 'default'
                    })
                    this.loading = false
                }).catch(error => {
                    if (error.response.status === 422) {
                        this.errors = error.response.data.errors
                        this.loading = false
                    }
                })
            }
        }
    }
}
</script>

<style scoped>
.photo {
    width: 44px;
    border-radius: 3px;
    float: left;
    margin-right: 20px;
    display: inline-block;
}

</style>