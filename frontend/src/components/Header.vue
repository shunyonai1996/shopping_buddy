<template>
  <v-app-bar app color="blue" dark>
    <v-img
      :src="require('/src/assets/logo.jpg')" 
      max-height="40"
      max-width="40"
      class="mr-3"
      contain
    ></v-img>
    <v-app-bar-title>Shopping Buddy</v-app-bar-title>
  </v-app-bar>
</template>

<script lang="ts">
export default {
  name: "HeaderComponent",
};
</script>