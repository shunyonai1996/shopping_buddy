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
export default {
  name: "HeaderComponent",
  props: {
    bookmarks: {
      type: Array,
      default: () => {
        const bookmarksData = localStorage.getItem("bookmarks");
        return bookmarksData ? JSON.parse(bookmarksData) : [];
      }
    },
  },
  methods: {
    loadBookmark(bookmark) {
      localStorage.setItem("tasks", JSON.stringify(bookmark.tasks));
    }
  }
};
</script>