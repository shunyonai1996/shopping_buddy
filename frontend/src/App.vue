<template>
    <div id="app">
        <header>
        <nav>
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </nav>
        </header>
        <main>
        <router-view></router-view>
        </main>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        name: 'App'
    });
</script>