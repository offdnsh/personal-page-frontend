<template>
    <div>
        <sui-container style="padding: 0 0.9em;">
            <sui-segment vertical>
                <sui-dimmer :active="loading" inverted>
                    <sui-loader size="small">Загрузка профиля @{{ this.$route.params.username }}...</sui-loader>
                </sui-dimmer>
                <sui-grid v-if="user">
                    <sui-grid-row>
                        <sui-grid-column :width="4">
                            <sui-image :src="`${user.photo}`" rounded size="medium"/>
                        </sui-grid-column>
                        <sui-grid-column :width="12">
                            <h1 style="margin-bottom: 1.6em;">{{ user.formatted_name }}</h1>
                            <sui-grid>
                                <sui-grid-row>
                                    <sui-grid-column :width="4">
                                        <sui-list>
                                            <sui-list-item>
                                                <strong style="display: block;margin-bottom: 12px;">Номер
                                                    телефона:</strong>
                                                {{ user.profile.phone || 'Не имеется' }}
                                            </sui-list-item>
                                            <sui-list-item>
                                                <strong style="display: block;margin-bottom: 12px;">Дата
                                                    рождения:</strong>
                                                {{ user.profile.birthday || 'Не имеется' }}
                                            </sui-list-item>
                                            <sui-list-item>
                                                <strong style="display: block;margin-bottom: 12px;">Опыт
                                                    работы:</strong>
                                                {{
                                                    user.work_experience_at ? user.work_experience_at + ' лет' : 'Не имеется'
                                                }}
                                            </sui-list-item>
                                        </sui-list>
                                    </sui-grid-column>
                                    <sui-grid-column :width="6">
                                        <sui-list>
                                            <sui-list-item>
                                                <strong style="display: block;margin-bottom: 12px;">Категория:</strong>
                                                <span class="lh">{{ user.profile.category || 'Не имеется' }}</span>
                                            </sui-list-item>
                                            <sui-list-item>
                                                <strong style="display: block;margin-bottom: 12px;">Учёная
                                                    степень:</strong>
                                                {{ user.profile.academic_degree || 'Не имеется' }}
                                            </sui-list-item>
                                            <sui-list-item>
                                                <strong style="display: block;margin-bottom: 12px;">Учёное
                                                    звание:</strong>
                                                {{ user.profile.academic_title || 'Не имеется' }}
                                            </sui-list-item>
                                        </sui-list>
                                    </sui-grid-column>
                                    <sui-grid-column :width="5">
                                        <sui-list>
                                            <sui-list-item>
                                                <strong style="display: block;margin-bottom: 12px;">Место
                                                    работы:</strong>
                                                <span class="lh">{{ user.profile.place_of_work || 'Не имеется' }}</span>
                                            </sui-list-item>
                                            <sui-list-item>
                                                <strong style="display: block;margin-bottom: 12px;">Должность:</strong>
                                                <span class="lh">{{ user.profile.position || 'Не имеется' }}</span>
                                            </sui-list-item>
                                        </sui-list>
                                    </sui-grid-column>
                                </sui-grid-row>
                            </sui-grid>
                        </sui-grid-column>
                    </sui-grid-row>
                    <sui-grid-row>
                        <sui-grid-column :width="16">
                            <sui-accordion is="sui-menu" style="width: 100%;margin-top: 32px;" vertical exclusive
                                           styled>
                                <sui-accordion-title is="sui-menu-header">Обо мне</sui-accordion-title>
                                <sui-accordion-content>
                                    <p class="lh">{{ user.profile.bio || 'Не имеется' }}</p>
                                </sui-accordion-content>
                                <sui-accordion-title is="sui-menu-header">Ссылки</sui-accordion-title>
                                <sui-accordion-content>
                                    <template
                                        v-if="user.profile.social.inst || user.profile.social.vk || user.profile.social.ok">
                                        <sui-table celled style="width: 420px;">
                                            <sui-table-body>
                                                <sui-table-row>
                                                    <sui-table-cell v-if="user.profile.social.vk">
                                                        <a :href="user.profile.social.vk">ВКонтакте</a>
                                                    </sui-table-cell>
                                                    <sui-table-cell v-if="user.profile.social.inst">
                                                        <a :href="user.profile.social.inst">Instagram</a>
                                                    </sui-table-cell>
                                                    <sui-table-cell v-if="user.profile.social.ok">
                                                        <a :href="user.profile.social.ok">Одноклассники</a>
                                                    </sui-table-cell>
                                                </sui-table-row>
                                            </sui-table-body>
                                        </sui-table>
                                    </template>
                                    <template v-else>
                                        Не имеется ссылок на социальные сети
                                    </template>
                                </sui-accordion-content>
                                <sui-accordion-title is="sui-menu-header">Файлы</sui-accordion-title>
                                <sui-accordion-content>
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
                                </sui-accordion-content>
                            </sui-accordion>
                        </sui-grid-column>
                    </sui-grid-row>
                </sui-grid>
                <sui-grid v-if="(!loading && !user)">
                    <sui-grid-row>
                        <sui-grid-column>
                            <div style="text-align: center">
                                Данный пользователь не найден.
                            </div>
                        </sui-grid-column>
                    </sui-grid-row>
                </sui-grid>
            </sui-segment>
        </sui-container>
    </div>
</template>

<script>
import User from '../../modules/User'
import File from "../../modules/File";

export default {
    name: 'UserProfile',
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
.list .item {
    padding: 14px 0 !important;
}

.list .item:first-child {
    padding-top: 0 !important;
}

.list .item:last-child {
    padding-bottom: 0 !important;
}

.lh {
    line-height: 26px !important;
}
</style>