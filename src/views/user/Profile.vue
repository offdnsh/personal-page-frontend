<template>
    <div class="profile">
        <sui-container style="padding: 0 0.5em;">
            <sui-grid :columns="2">
                <sui-grid-row>
                    <sui-grid-column :width="3">
                        <img class="profile__avatar" src="https://sun9-75.userapi.com/impg/Rc-i2UxJUpq0JqsUWB0-9S93L2tUse8HpQnp5w/Bs-OyaXW2jE.jpg?size=978x1001&quality=96&sign=bca08368ce91968b47281e8aa84bd15b&type=album" alt="">
                    </sui-grid-column>
                    <sui-grid-column :width="5">
                        <div class="bottom">
                            <h3 class="profile__name">Андрей Ильинов</h3>
                            <div class="profile__academic_degree">Доктор наук</div>
                        </div>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
            <sui-grid :columns="2">
                <sui-grid-row>
                    <sui-grid-column :width="3" />
                    <sui-grid-column :width="10">
                        <sui-tab class="profile__tabs" :menu="{ text: true }">
                            <sui-tab-pane title="О преподаватели" :attached="false">
                                <sui-grid :columns="3">
                                    <sui-grid-row>
                                        <sui-grid-column>
                                            <div class="info">
                                                <strong>Дата регистрации</strong>
                                                15 июня 2021 г.
                                            </div>
                                        </sui-grid-column>
                                        <sui-grid-column>
                                            <div class="info">
                                                <strong>Дата рождения</strong>
                                                9 марта 2001 г.
                                            </div>
                                        </sui-grid-column>
                                        <sui-grid-column>
                                            <div class="info">
                                                <strong>Опыт работы</strong>
                                                15 лет
                                            </div>
                                        </sui-grid-column>
                                    </sui-grid-row>
                                    <sui-grid-row>
                                        <sui-grid-column>
                                            <div class="info">
                                                <strong>Категория</strong>
                                                Высшая квалификационная категория
                                            </div>
                                        </sui-grid-column>
                                        <sui-grid-column>
                                            <div class="info">
                                                <strong>Учёная степень</strong>
                                                Доктор наук
                                            </div>
                                        </sui-grid-column>
                                        <sui-grid-column>
                                            <div class="info">
                                                <strong>Учёное звание</strong>
                                                Профессор
                                            </div>
                                        </sui-grid-column>
                                    </sui-grid-row>
                                    <sui-grid-row>
                                        <sui-grid-column :width="8">
                                            <div class="info">
                                                <strong>Место работы</strong>
                                                МБОУ "Приволжская СОШ №1"
                                            </div>
                                        </sui-grid-column>
                                        <sui-grid-column :width="8">
                                            <div class="info">
                                                <strong>Должность</strong>
                                                Ассистент кафедры геологии нефти и газа
                                            </div>
                                        </sui-grid-column>
                                    </sui-grid-row>
                                </sui-grid>
                            </sui-tab-pane>
                            <sui-tab-pane title="Материалы" :attached="false">
                                Box
                            </sui-tab-pane>
                            <sui-tab-pane title="Связаться с преподававтелем" :attached="false">
                                Triangle
                            </sui-tab-pane>
                        </sui-tab>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>

<script>
export default {
    name: "Profile"
}
</script>

<style scoped>
.profile .profile__avatar {
    width: 100%;
    background-size: cover;
    background-position: center center;
    border-radius: 6px;
}

.profile .bottom {
    position: absolute;
    bottom: 3em;
}

.profile .profile__tabs .info strong {
    display: block;
    margin-bottom: 16px;
    font-weight: 500;
    color: #101840;
}

.profile .profile__tabs .info {
    line-height: 28px;
}

.profile .profile__tabs .row {
    padding: 20px 0;
}

</style>