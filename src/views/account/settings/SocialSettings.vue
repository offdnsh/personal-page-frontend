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
                                <label>Инстаграм</label>
                                <sui-input icon="instagram" icon-position="left" v-model="form.inst_url" />
                                <span class="error" v-if="errors.inst_url">{{ errors.inst_url[0] }}</span>
                            </sui-form-field>
                            <sui-form-field>
                                <label>ВКонтакте</label>
                                <sui-input icon="vk" icon-position="left" v-model="form.vk_url" />
                                <span class="error" v-if="errors.vk_url">{{ errors.vk_url[0] }}</span>
                            </sui-form-field>
                            <sui-form-field>
                                <label>Одноклассники</label>
                                <sui-input icon="odnoklassniki" icon-position="left" v-model="form.ok_url" />
                                <span class="error" v-if="errors.ok_url">{{ errors.ok_url[0] }}</span>
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
    name: "SocialSettings",
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