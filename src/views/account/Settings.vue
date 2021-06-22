<template>
    <div>
        <sui-container style="padding: 0 0.9em;">
            <h2 style="font-weight: 800;margin-bottom: 42px;">Настройки</h2>
            <sui-accordion exclusive style="width: 100%;" styled verical>
                <sui-accordion-title active>
                    <h4 style="margin-bottom: 8px;">Основное</h4>
                    <p style="font-size: 13px;font-weight: 400">Эта информация является основкой для аккаунта.</p>
                </sui-accordion-title>
                <sui-accordion-content>
                    <sui-grid>
                        <AccountSettings />
                    </sui-grid>
                </sui-accordion-content>
                <sui-accordion-title>
                    <h4 style="margin-bottom: 8px;">Профиль</h4>
                    <p style="font-size: 13px;font-weight: 400">Эта информация будет отображаться публично, поэтому будьте осторожны с тем, чем вы делитесь.</p>
                </sui-accordion-title>
                <sui-accordion-content>
                    <sui-grid>
                        <ProfileSettings />
                    </sui-grid>
                </sui-accordion-content>
                <sui-accordion-title>
                    <h4 style="margin-bottom: 8px;">Социальные сети</h4>
                    <p style="font-size: 13px;font-weight: 400">Эта информация позволяет вам делится своими страницами в социальных сетях.</p>
                </sui-accordion-title>
                <sui-accordion-content>
                    <sui-grid>
                        <SocialSettings />
                    </sui-grid>
                </sui-accordion-content>
            </sui-accordion>
        </sui-container>
    </div>
</template>

<script>
import AccountSettings from "./settings/AccountSettings";
import ProfileSettings from "./settings/ProfileSettings";
import SocialSettings from "./settings/SocialSettings";

export default {
    name: 'Settings',
    metaInfo: {
        title: 'Настройки'
    },
    components: {SocialSettings, ProfileSettings, AccountSettings},
}
</script>

<style scoped>
.ui.styled.accordion .accordion .title, .ui.styled.accordion .title {
    padding: 20px 24px !important;
}

.ui.styled.accordion .accordion .content, .ui.styled.accordion .content {
    padding: 10px 24px;
}
</style>