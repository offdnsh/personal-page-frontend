<template>
    <div>
        <sui-container style="padding: 0 0.9em;">
            <sui-grid>
                <sui-grid-row>
                    <sui-grid-column :width="4"></sui-grid-column>
                    <sui-grid-column :width="6" class="not-found">
                        <img src="@/assets/images/cherry-page-not-found.png" alt="">
                        <h3>Страница не найдена</h3>
                        <p>Страница, которую вы ищете, не существует или была перемещена</p>
                    </sui-grid-column>
                </sui-grid-row>
            </sui-grid>
        </sui-container>
    </div>
</template>

<script>
import User from '../../modules/User'
import {mapActions} from 'vuex'

export default {
    name: `Signup`,
    metaInfo: {
        title: 'Страница не найдена'
    },
}
</script>

<style scoped>
.not-found {
    text-align: center;
}

.not-found img {
    width: 360px;
    margin-bottom: 22px;
}

.not-found h3 {
    margin-bottom: 22px;
}

.not-found p {
    line-height: 30px;
}
</style>