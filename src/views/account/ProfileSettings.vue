<template>
    <div style="padding-bottom: 12em">
        <sui-container style="padding: 0 0.9em">
            <sui-grid>
                <sui-grid-row>
                    <SettingsListMenu />
                    <sui-grid-column :width="10">
                        <h4 style="margin-bottom: 3em;">Настройки пубичнего профиля</h4>
                        <sui-segment vertical>
                            <sui-dimmer :active="loading" inverted>
                                <sui-loader size="small">Загрузка ...</sui-loader>
                            </sui-dimmer>
                            <sui-form @submit.prevent="onSaveChange">
                                <sui-form-field>
                                    <label>Номер телефона</label>
                                    <input type="number" name="phone" style="width: 220px" v-model="form.phone"  />
                                    <span class="error" v-if="errors.phone">{{ errors.phone[0] }}</span>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>Дата рождения</label>
                                    <input type="date" name="birthday" style="width: 320px;" v-model="form.birthday"  />
                                    <span class="error" v-if="errors.birthday">{{ errors.birthday[0] }}</span>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>О себе</label>
                                    <textarea name="bio" v-model="form.bio" rows="10"></textarea>
                                    <span class="error" v-if="errors.bio">{{ errors.bio[0] }}</span>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>С кокого года вы начали работать</label>
                                    <input type="number" style="width: 150px;"  name="work_experience_at" min="1920" v-model="form.work_experience_at"  />
                                    <span class="error" v-if="errors.work_experience_at">{{ errors.work_experience_at[0] }}</span>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>Категория</label>
                                    <sui-dropdown
                                        placeholder=""
                                        selection
                                        :labeled="false"
                                        style="width: 320px;"
                                        :options="[ { text: 'Не имеется', value: 'Не имеется', key: 'Не имеется' }, { key: 'Первая  квалификационная  категория', text: 'Первая  квалификационная  категория', key: 'Первая  квалификационная  категория', value: 'Первая  квалификационная  категория' }, { text: 'Высшая  квалификационная  категория', value: 'Высшая  квалификационная  категория' } ]"
                                        v-model="form.category"
                                    />
                                    <span class="error" v-if="errors.category">{{ errors.category[0] }}</span>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>Учёная степень</label>
                                    <sui-dropdown
                                        placeholder=""
                                        selection
                                        style="width: 320px;"
                                        :options="[ { text: 'Не имеется',  value: 'Не имеется', key: 'Не имеется', }, { text: 'Кандидат наук', value: 'Кандидат наук', key: 'Кандидат наук', }, {  key: 'Доктор наук', text: 'Доктор наук', value: 'Доктор наук' } ]"
                                        v-model="form.academic_degree"
                                    />
                                    <span class="error" v-if="errors.academic_degree">{{ errors.academic_degree[0] }}</span>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>Учёное звание</label>
                                    <sui-dropdown
                                        placeholder=""
                                        selection
                                        style="width: 320px;"
                                        :options="[ { text: 'Не имеется',  value: 'Не имеется', key: 'Не имеется', }, { text: 'Доцент', value: 'Доцент', key: 'Доцент', }, {  key: 2, text: 'Профессор', value: 'Профессор', key: 'Профессор' } ]"
                                        v-model="form.academic_title"
                                    />
                                    <span class="error" v-if="errors.academic_title">{{ errors.academic_title[0] }}</span>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>Место работы</label>
                                    <input type="text" style="width: 420px;"  name="place_of_work" min="1920" v-model="form.place_of_work"  />
                                    <span class="error" v-if="errors.place_of_work">{{ errors.place_of_work[0] }}</span>
                                </sui-form-field>
                                <sui-form-field>
                                    <label>Должность</label>
                                    <input type="text" style="width: 420px;"  name="position" min="1920" v-model="form.position"  />
                                    <span class="error" v-if="errors.position">{{ errors.position[0] }}</span>
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
import Account from "../../modules/Account";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'ProfileSettings',
    components: {SettingsListMenu},
    data: () => ({
        loading: false,
        form: {
            phone: '',
            birthday: '',
            bio: '',
            category: '',
            work_experience_at: '',
            academic_degree: '',
            academic_title: '',
            place_of_work: '',
            position: ''
        },
        errors: []
    }),
    computed: {
        ...mapGetters({
            user: 'auth/user'
        })
    },
    mounted() {
        const profile = this.user.profile
        this.form = {
            phone: profile.phone,
            birthday: profile.birthday || '',
            bio: profile.bio || '',
            work_experience_at: profile.work_experience_at || '',
            category:profile.category || 'Не имеется',
            academic_degree: profile.academic_degree || 'Не имеется',
            academic_title: profile.academic_title || 'Не имеется',
            place_of_work: profile.place_of_work,
            position: profile.position
        }
    },
    methods: {
        ...mapActions({
            refreshUserData: 'auth/refreshUserData'
        }),
        onSaveChange() {
            this.loading = true
            this.errors = []

            Account.updateMainDataProfile(this.form).then(response => {
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