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
    <a href="https://github.com/shunyonai1996/shopping_buddy">
      <v-icon>mdi-github</v-icon>
    </a>

    <v-menu bottom left>
      <template v-slot:activator="{ on }">
        <v-btn v-on="on" icon>
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item v-for="(bookmark, index) in bookmarks" :key="index">
          <v-btn @click="changeBookmark">
            <v-list-item-title>{{ bookmark.name }}</v-list-item-title>
          </v-btn>
          <span>｜</span>
          <v-btn small @click="deleteBookmark" class="text-capitalize ma-1" icon>
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
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
    EventBus.$on("bookmarks-updated", this.loadBookmarks);
    this.loadBookmarks();
  },
  beforeDestroy() {
    EventBus.$off("bookmarks-updated", this.loadBookmarks);
  },
  methods: {
    loadBookmarks() {
      const bookmarksData = localStorage.getItem("bookmarks");
      if (bookmarksData) {
        this.bookmarks = JSON.parse(bookmarksData);
      }
    },
    changeBookmark() {
      console.log("changeBookmark");
    },
    deleteBookmark() {
      console.log("deleteBookmark");
    },
  },
};
</script>