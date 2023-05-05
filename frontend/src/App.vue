<template>
    <v-app>
        <HeaderComponent />
        <router-view />
        <FooterComponent />
    </v-app>
</template>

<script lang="ts">
import HeaderComponent from './components/Header.vue'
import FooterComponent from './components/Footer.vue'
import MainComponent from './components/Main.vue'

export default {
    components: {
        HeaderComponent,
        FooterComponent,
        MainComponent
    },
};
</script>