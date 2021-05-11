<template>
    <div>
        <sui-container style="padding: 0 0.9em;">
            <sui-grid>
                <sui-grid-row>
                    <SettingsListMenu />
                    <sui-grid-column :width="6">
                        <h4 style="margin-bottom: 3em;">Социальные сети</h4>
                        <sui-segment vertical>
                            <sui-form @submit.prevent="onSaveChange">
                                <sui-dimmer :active="loading" inverted>
                                    <sui-loader size="small">Загрузка ...</sui-loader>
                                </sui-dimmer>
                                <sui-form-field>
                                    <label>Инстаграм</label>
                                    <input type="text" name="inst_url" v-model="form.inst_url"  />
                                    <span class="error" v-if="errors.inst_url">{{ errors.inst_url[0] }}</span>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>ВКонтакте</label>
                                    <input type="text" name="vk_url" v-model="form.vk_url"  />
                                    <span class="error" v-if="errors.vk_url">{{ errors.vk_url[0] }}</span>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>Одноклассники</label>
                                    <input type="text" name="ok_url" v-model="form.ok_url"  />
                                    <span class="error" v-if="errors.ok_url">{{ errors.ok_url[0] }}</span>
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
import Account from "../../modules/Account";

export default {
    name: 'ProfileSocial',
    metaInfo: {
        title: 'Социальные сети'
    },
    components: {
        SettingsListMenu
    },
    data: () => ({
        form: {
            inst_url: '',
            vk_url: '',
            ok_url: ''
        },
        loading: false,
        errors: []
    }),
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    },
    mounted () {
        const profile = this.user.profile
        this.form = {
            inst_url: profile.social.inst || '',
            vk_url: profile.social.vk || '',
            ok_url: profile.social.ok || '',
        }
    },
    methods: {
        ...mapActions({
            refreshUserData: 'auth/refreshUserData'
        }),
        onSaveChange () {
            this.loading = true
            this.errors = []
            Account.updateSocialProfile(this.form).then(response => {
                this.refreshUserData()
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
</script>

<style scoped>

</style>