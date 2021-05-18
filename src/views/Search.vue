<template>
    <sui-container style="padding: 0 0.9em;">
        <sui-grid>
            <sui-grid-row>
                <sui-grid-column :width="7">
                    <h3 style="font-weight: 800;margin-bottom: 32px;">Преподаватели.</h3>
                    <p style="line-height: 32px;width: 80%;margin-bottom: 32px;">Для запроса необходимо знать <b>ФИО</b> или <b>электронную почту</b> преподавателя.</p>
                    <sui-form>
                        <sui-input style="width: 100%" v-model.lazy="form.query" @input="onSearch" :loading="loading" placeholder="Введите запрос ..." />
                    </sui-form>
                    <sui-segment :style="loading ? 'min-height: 220px;' : ''" vertical>
                        <sui-dimmer :active="loading" inverted>
                            <sui-loader>Поиск ...</sui-loader>
                        </sui-dimmer>
                        <template v-if="form.query.length > 0">
                            <template v-if="users.length">
                                <sui-item-group>
                                    <sui-item v-for="user in users" :key="user.id">
                                        <sui-item-image size="mini" :src="user.photo" />
                                        <sui-item-content vertical-align="top">
                                            <sui-item-header style="font-size: 16px;">
                                                <router-link :to="{ name: 'users.profile', params: {username: user.username} }">{{ user.formatted_name }}</router-link>
                                            </sui-item-header>
                                            <sui-item-meta style="margin-top: 6px;">
                                                <span v-if="user.profile.academic_degree">{{ user.profile.academic_degree }}</span>
                                                <span v-else>{{ user.email }}</span>
                                            </sui-item-meta>
                                        </sui-item-content>
                                    </sui-item>
                                </sui-item-group>
                            </template>
                            <template v-if="!loading && !users.length">
                                <p>По вашему запросу ничего не найдено.</p>
                            </template>
                        </template>
                    </sui-segment>
                </sui-grid-column>
            </sui-grid-row>
        </sui-grid>
    </sui-container>
</template>

<script>
import User from "../modules/User";

export default {
    name: "Search",
    data: () => ({
        loading: false,
        form: {
            query: ''
        },
        users: []
    }),
    methods: {
        onSearch () {
            this.loading = true
            this.users = []

            if (this.form.query.length > 0) {
                User.search(this.form.query).then(response => {
                    this.loading = false
                    this.users = response.data
                }).catch(() => {
                    this.loading = false
                })
            } else {
                this.loading = false
            }
        }
    }
}
</script>

<style scoped>

</style>