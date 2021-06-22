<template>
    <sui-container style="padding: 0 0.9em;">
        <h3 style="margin-bottom: 22px;">Преподаватели</h3>
        <p class="description">Введите запрос для получения
            преподавателей, в запросе можно ввести <u>имя преподавателя</u>, <u>электронную почту</u> или <u>номер
                телефона</u>.</p>
        <sui-form @submit.prevent="">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="8">
                        <sui-form-field>
                            <sui-input
                                icon="search"
                                icon-position="left"
                                placeholder="Введите ваш запрос ..."
                                v-model.trim="form.query"
                                tabindex="0"
                                id="inputSearch"
                                @keydown="onKeyDown"
                            />
                            <div class="helpers">
                                <span>↑</span>
                                <span>↓</span>
                                для навигации.
                                <span>↵</span>
                                для выбора.
                                <span>/</span>
                                для поиска в любое время.
                            </div>
                        </sui-form-field>
                    </sui-grid-column>
                   <sui-grid-column>
                       <sui-button
                           :disabled="!form.query.length"
                           primary
                           @click="onSearch"
                       >
                           Найти
                       </sui-button>
                   </sui-grid-column>
                </sui-grid-row>
                <sui-grid-row>
                    <sui-grid-column :width="8">
                        <sui-segment :style="loading ? 'min-height: 220px;' : ''" vertical>
                            <sui-dimmer :active="loading" inverted>
                                <sui-loader>Выполняется запрос ...</sui-loader>
                            </sui-dimmer>

                            <template v-if="users.length > 0 && form.query.length > 0 && !loading">
                                <router-link :to="{ name: 'users.profile', params: {username: user.username} }" :tabindex="index + 1" v-for="(user, index) in users" :key="user.id">
                                    <div class="user"  aria-checked="false" :class="{ focus: index === focus }">
                                        <div class="user__image">
                                            <img :src="user.photo" alt="User photo">
                                        </div>
                                        <div class="user__name">
                                            {{ user.formatted_name }}
                                            <span>@{{ user.username }}</span>
                                        </div>
                                    </div>
                                </router-link>
                            </template>
                            <template v-if="!loading && empty">
                                <div class="empty">
                                    <img src="@/assets/images/cherry-list-is-empty-1.png" alt="">
                                    <h3>К сожалению, результат не найден.</h3>
                                    <p>То, что вы искали, к сожалению, не было найдено или не существует.</p>
                                </div>
                            </template>
                        </sui-segment>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-form>
    </sui-container>
</template>

<script>
import User from "../modules/User";

export default {
    name: "Search",
    data: () => ({
        form: {
            query: ''
        },
        loading: false,
        users: [],
        focus: null,
        empty: false
    }),
    metaInfo: {
        title: 'Преподаватели'
    },
    methods: {
        onSearch () {
            this.loading = true
            this.users = []

            if (this.form.query.length > 0) {
                User.search(this.form.query).then(response => {
                    this.users = response.data

                    this.empty = !this.users.length

                    this.loading = false
                }).catch(() => {
                    this.loading = false
                })
            } else {
                this.loading = false
            }
        },
        onKeyDown (event) {
            switch (event.keyCode) {
                case 38:
                    if (this.focus === null) {
                        this.focus = 0;
                    } else if (this.focus > 0) {
                        this.focus--;
                    }
                    break;
                case 40:
                    if (this.focus === null) {
                        this.focus = 0
                    } else if (this.focus < this.users.length - 1) {
                        this.focus++
                    }
                    break;
                case 13:
                    if (this.users.length) {
                        let elm = document.getElementsByClassName('user')[this.focus]
                        let username = elm.lastElementChild.lastElementChild.textContent.split('@')[1]
                        this.$router.replace({
                            name: 'users.profile',
                            params: {
                                username
                            }
                        })
                    }
                    break;
            }
        }
    },
    mounted() {
        window.addEventListener('keydown', (event) => {
            if (event.keyCode === 191) {
                event.preventDefault()
                document.getElementById('inputSearch').children[0].focus()
            }
        })
    }
}
</script>

<style scoped>
.description {
    width: 550px;
    line-height: 34px;
    color: #696f8c;
    margin-bottom: 32px;
}

.description u {
    text-decoration: none;
}

.helpers {
    margin-top: 14px;
    font-size: 12px;
}

.helpers span {
    background: #F4F5F9;
    border-radius: 6px;
    padding: 4px 10px;
    margin-right: 10px;
}

.user {
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    margin-bottom: 4px;
    padding: 12px 18px;
}

.user:hover, .user.focus {
    background: #F7F7F9;
    border-radius: 12px;
    cursor: pointer;
}

.user .user__image {
    margin-right: 18px;
}

.user .user__image img {
    width: 60px;
    height: 60px;
    vertical-align: middle;
    background-size: cover;
    border-radius: 6px;
    background-position: center center;
}

.user .user__name {
    color: #101840;
    font-weight: 600;
}

.user .user__name span {
    display: block;
    margin-top: 1px;
    color: #3366FF;
    font-weight: 400;
}

.empty {
    text-align: center;
    margin-top: 32px;
}

.empty img {
    width: 170px;
    margin-bottom: 42px;
}

.empty h3 {
    font-size: 16px;
}

.empty p {
    color: #474d66;
}
</style>