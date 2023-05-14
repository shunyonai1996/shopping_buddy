<template>
  <v-app-bar app color="#F57C00" dark>
    <v-img
      :src="require('/src/assets/logo.png')" 
      max-height="50"
      max-width="50"
      class="ma-1 pa-1"
      contain
    ></v-img>
    <v-app-bar-title class="" >Shopping Buddy</v-app-bar-title>
  </v-app-bar> 
</template>

<script lang="ts">
export default {
  name: "HeaderComponent",
};
</script>