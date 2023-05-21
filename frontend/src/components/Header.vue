<template>
  <v-app-bar app color="#F57C00" dark>
    <v-img
      :src="require('@/assets/logo.png')"
      max-height="50"
      max-width="50"
      class="ma-1 pa-1"
      contain
    ></v-img>
    <v-app-bar-title class="" >Shopping Buddy</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-menu bottom left>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(bookmark, index) in bookmarks" :key="index" @click="loadBookmark(bookmark)">
          <v-list-item-title>{{ bookmark.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar> 
</template>

<script>
import { EventBus } from "@/event-bus";

export default {
  name: "HeaderComponent",
  data() {
    return {
      bookmarks: [],
    };
  },
  mounted() {
    const bookmarksData = localStorage.getItem("bookmarks");
    if (bookmarksData) {
      this.bookmarks = JSON.parse(bookmarksData);
      console.log(this.bookmarks);
    }
    EventBus.$on("bookmarks-updated", (bookmarks) => {
      this.bookmarks = bookmarks;
    });
  },
  methods: {
    loadBookmark(bookmark) {
      localStorage.getItem("bookmarks", JSON.stringify(bookmark.tasks));
    }
  },
};
</script>