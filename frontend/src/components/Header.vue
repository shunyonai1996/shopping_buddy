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
        <v-row justify="center" class="ma-1 ">
          <p>ブックマーク一覧</p>
        </v-row>
        <v-list-item v-for="(bookmark, index) in bookmarks" :key="index">
          <v-btn @click="changeBookmark(index)">
            <v-list-item-title>{{ bookmark.name }}</v-list-item-title>
          </v-btn>
          <span>｜</span>
          <v-btn small @click="deleteBookmark(index)" class="text-capitalize ma-1" icon>
            <v-icon>
              mdi-delete
            </v-icon>
          </v-btn>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script lang="ts">
import { EventBus } from "../event-bus";

export default {
  name: "HeaderComponent",
  data() {
    return {
      bookmarks: [] as {id: number; name: string; tasks: any[] }[],
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
    changeBookmark(index: number) {
      const bookmarkData = localStorage.getItem("bookmarks");
      if(bookmarkData) {
        const bookmarks = JSON.parse(bookmarkData);
        if(index >= 0 && index < bookmarks.length) {
          const tasks = bookmarks[index].tasks;
          localStorage.setItem("tasks", JSON.stringify(tasks));
          EventBus.$emit("tasks-updated", tasks);
        }
      }
    },
    deleteBookmark(index: number) {
      const bookmarkData = localStorage.getItem("bookmarks");
      if(bookmarkData) {
        const bookmarks = JSON.parse(bookmarkData) as { id: number; name: string; tasks: any[] }[];
        if(index >= 0 && index < bookmarks.length) {
          bookmarks.splice(index, 1);
          localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
          this.loadBookmarks();
        }
      }
    },
  },
};
</script>