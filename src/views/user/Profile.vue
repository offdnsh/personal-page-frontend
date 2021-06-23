<template>
    <div class="profile">
        <sui-container>
            <sui-segment vertical>
                <sui-dimmer :active="loading" inverted>
                    <sui-loader size="small">Загрузка профиля @{{ this.$route.params.username }}...</sui-loader>
                </sui-dimmer>
                <sui-grid v-if="user" :columns="2">
                    <sui-grid-row>
                        <sui-grid-column :width="4">
                            <img :src="user.photo" alt="User photo">
                        </sui-grid-column>
                        <sui-grid-column :width="12">
                            <div class="profile-header">
                                <h3>{{ user.formatted_name }}</h3>
                                <span style="display: block;margin-bottom: 20px;">@{{ user.username }}</span>
                            </div>
                            <table class="profile-table">
                                <tbody>
                                <tr>
                                    <td>Дата регистрации</td>
                                    <td>{{ user.created_at | formated_date }}</td>
                                </tr>
                                <tr>
                                    <td>Электронная почта</td>
                                    <td><a :href="'mailto://' + user.email">{{ user.email }}</a></td>
                                </tr>
                                <tr v-if="user.profile.phone">
                                    <td>Номер телефона</td>
                                    <td>{{ user.profile.phone }}</td>
                                </tr>
                                <tr v-if="user.profile.birthday">
                                    <td>Дата рождения</td>
                                    <td>{{ user.profile.birthday | formated_date({day: 'numeric', month: 'long', year: 'numeric'}) }}</td>
                                </tr>
                                <tr v-if="user.profile.bio">
                                    <td>Обо мне</td>
                                    <td style="line-height: 26px;">{{ user.profile.bio }}</td>
                                </tr>
                                <tr v-if="user.profile.work_experience_at">
                                    <td>Опыт работы</td>
                                    <td>{{ user.profile.work_experience_at | plural(user.profile.work_experience_at, 'год', 'лет', 'годов') }}</td>
                                </tr>
                                <tr v-if="user.profile.category">
                                    <td>Категория</td>
                                    <td>{{ user.profile.category }} лет</td>
                                </tr>
                                <tr v-if="user.profile.academic_degree">
                                    <td>Учёная степень</td>
                                    <td>{{ user.profile.academic_degree }}</td>
                                </tr>
                                <tr v-if="user.profile.academic_title">
                                    <td>Учёное звание</td>
                                    <td>{{ user.profile.academic_title }}</td>
                                </tr>
                                <tr v-if="user.profile.place_of_work">
                                    <td>Место работы</td>
                                    <td>{{ user.profile.place_of_work }}</td>
                                </tr>
                                <tr v-if="user.profile.position">
                                    <td>Должность</td>
                                    <td>{{ user.profile.position }}</td>
                                </tr>
                                <tr v-if="user.profile.social.vk">
                                    <td>ВКонтакте</td>
                                    <td><a :href="user.profile.social.vk" target="_blank">
                                        Перейти на страницу
                                        <svg xmlns="http://www.w3.org/2000/svg" class="link" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a></td>
                                </tr>
                                <tr v-if="user.profile.social.inst">
                                    <td>Инстаграм</td>
                                    <td><a :href="user.profile.social.inst" target="_blank">
                                        Перейти на страницу
                                        <svg xmlns="http://www.w3.org/2000/svg" class="link" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a></td>
                                </tr>
                                <tr v-if="user.profile.social.ok">
                                    <td>Одноклассники</td>
                                    <td><a :href="user.profile.social.ok" target="_blank">
                                        Перейти на страницу
                                        <svg xmlns="http://www.w3.org/2000/svg" class="link" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a></td>
                                </tr>
                                </tbody>
                            </table>
                            <sui-segment vertical >
                                <sui-dimmer :active="loadingFiles" inverted>
                                    <sui-loader size="small">Зазрузка файлов...</sui-loader>
                                </sui-dimmer>
                                <sui-table celled padded>
                                    <sui-table-header>
                                        <sui-table-row>
                                            <sui-table-header-cell>Наименование</sui-table-header-cell>
                                            <sui-table-header-cell>Категория</sui-table-header-cell>
                                        </sui-table-row>
                                    </sui-table-header>
                                    <sui-table-body v-if="files.length">
                                        <sui-table-row
                                            v-for="file in files"
                                            :key="file.id"
                                        >
                                            <sui-table-cell>
                                                <a href="#"
                                                   @click.prevent="downloadFile(file.filename)">{{ file.name }}</a>
                                            </sui-table-cell>
                                            <sui-table-cell>{{ file.category }}</sui-table-cell>
                                        </sui-table-row>
                                    </sui-table-body>
                                    <sui-table-body v-else>
                                        <sui-table-cell>Файлов не имеется</sui-table-cell>
                                    </sui-table-body>
                                </sui-table>
                            </sui-segment>
                        </sui-grid-column>
                    </sui-grid-row>
                </sui-grid>
            </sui-segment>
        </sui-container>
    </div>
</template>

<script>
import User from "../../modules/User";
import File from "../../modules/File";

export default {
    name: "Profile",
    data: () => ({
        loading: false,
        user: null,
        files: [],
        loadingFiles: true
    }),
    created() {
        this.fetchUserProfile()
        document.title = `Профиль @${this.$route.params.username}`
    },
    methods: {
        fetchUserProfile() {
            this.loading = true
            User.showProfile(this.$route.params.username).then(response => {
                this.user = response.data
                this.fetchAllFiles(response.data.id)
                this.loading = false
            }).catch(error => {
                this.loading = false
            })
        },
        fetchAllFiles() {
            this.loadingFiles = true
            File.getAllById(this.user.id).then(response => {
                this.files = response.data
                this.loadingFiles = false
            }).catch(error => {
                console.error(error)
            })
        },
        downloadFile(filename) {
            this.loadingFiles = true
            File.download(filename).then(response => {
                let fileLink = document.createElement('a');

                fileLink.href = response.data.url
                fileLink.setAttribute('download', true)
                document.body.appendChild(fileLink)
                this.loadingFiles = false
                fileLink.click()
            })
        }
    }
}
</script>

<style scoped>

.profile {
    padding-bottom: 7em;
}

.profile img {
    border: solid 3px #fff;
    border-radius: 18px;
    box-shadow: 0 0 0 2px #2246ec;
}

.profile .profile-header {
    margin-top: 8em;
    margin-bottom: 3em;
}

.profile .profile-header h3 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 8px;
}

.profile .profile-header span {
    color: #3366FF;
}

.profile .profile-table {
    width: 100%;
}

.profile .profile-table tr:nth-child(even) {
    background: #F9FAFC;
    border: 0;
    border-collapse: collapse;
}

.profile .profile-table td {
    padding: 18px 24px;
    border: 0;
    border-collapse: collapse;
    vertical-align: top;
}


.profile .profile-table tr td:first-child {
    font-weight: 400;
    width: 320px;
    color: #0b0d23;
}

.profile-table a {
    color: #2952CC;
    padding-bottom: 2px;
    border-bottom: solid 1px #2952CC;
}

.profile-table .link {
    width: 14px;
    height: 14px;
    margin-left: 8px;
}

</style>