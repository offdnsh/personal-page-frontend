<template>
    <div>
        <sui-container>
            <div class="header section">
                <div class="arrow" data-aos-delay="600" data-aos-duration="300" data-aos="zoom-in">
                    <img src="@/assets/images/buddy-arrow.png" alt="">
                </div>
                <div class="header__text">
                    <h3 data-aos="fade-right">Создайте впечатлящию визитку преподавателя</h3>
                    <p data-aos="fade-right" data-aos-delay="50">Визитная карточка преподавателя, о рассказе, о себе, пройденных курсах, повышения квалификации, полученных дипломах, грамотах и других наград, показать всем результат своей педагогической деятельности.</p>
                    <template v-if="authenticated">
                        <router-link :to="{ name: 'account.settings' }" data-aos="fade-down" data-aos-delay="200">
                            <sui-button icon="edit outline" label-position="right">Редактировать данные</sui-button>
                        </router-link>
                    </template>
                    <template v-else>
                        <router-link :to="{ name: 'auth.signup' }" data-aos="fade-down" data-aos-delay="200">
                            <sui-button primary icon="address card outline" label-position="right">Создать визитную карту</sui-button>
                        </router-link>
                    </template>
                </div>
                <div class="header__image" data-aos-delay="200" data-aos="zoom-in">
                    <img src="@/assets/images/cherry-669.png" alt="">
                </div>
            </div>
            <div class="section about">
                <sui-grid :columns="2">
                    <sui-grid-row>
                        <sui-grid-column>
                            <img data-aos="zoom-in-down" data-aos-delay="400" src="@/assets/images/cherry-online-team-meeting-1.png" alt="">
                        </sui-grid-column>
                        <sui-grid-column :width="8">
                            <h3 data-aos="fade-left" data-aos-delay="450">О проекте</h3>
                            <p data-aos="fade-down-left" data-aos-delay="500"><strong>Elgeria</strong> - онлайн сервис который открывает новую среду и новые возможности для преподавателя, размещая на личной странице познавательные материалы, информацию которая заинтересует студентов тем самым произойдет взаимодействие педагога как личность.</p>
                        </sui-grid-column>
                    </sui-grid-row>
                </sui-grid>
            </div>
            <div class="section benefit">
                <h3 data-aos="fade-down">Преимещуства</h3>
                <sui-grid :columns="3" style="margin-top: 38px;">
                    <sui-grid-row>
                        <sui-grid-column data-aos="zoom-in" class="item">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                            <h3>Репутация</h3>
                            <p>Карточка преподавателя создает хорошую репутацию преподавателю, работает на сохранение своего общественного имиджа, общественного признания</p>
                        </sui-grid-column>
                        <sui-grid-column data-aos="zoom-in" data-aos-delay="500" class="item">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                    <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                </svg>
                            </div>
                            <h3>Квалификация</h3>
                            <p>При помощи визитной карты заслужит получение более выскокой преподавательской категории</p>
                        </sui-grid-column>
                        <sui-grid-column data-aos="zoom-in" data-aos-delay="1000" class="item">
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                            </div>
                            <h3>Портфолио</h3>
                            <p>На сайте для всеобщего обозрения преподаватель может выклдавывать свой методички, награды и т.д.</p>
                        </sui-grid-column>
                    </sui-grid-row>
                </sui-grid>
            </div>
        </sui-container>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: 'Home',
    metaInfo: {
        title: 'Домашняя страница'
    },
    computed: {
        ...mapGetters({
            authenticated: 'auth/authenticated'
        })
    }
}
</script>

<style scoped>

</style>