<template>
  <div class="orange lighten-5" style="position: relative; min-height: 100%; margin-top: 50px;">
    <v-main ref="mainComponent">

      <div v-if="tasks.length > 0">
          <v-btn @click="openModal">ブックマークに追加</v-btn>
          <v-btn @click="removeAllTask">全て削除</v-btn>
      </div>

      <v-container class="pb-5" v-if="tasks.length > 0">
        <draggable 
        v-model="tasks"
        :animation="300"
        handle=".drag-handle">
          <v-row v-for="(task, index) in tasks" :key="task.id" class="align-center my-0 py-0" style="min-height: 40px; max-height: 40px;">
            <v-col cols="2" class="d-flex justify-center align-center pa-0 ma-0">
              <v-btn small @click="deleteTask(index)" class="todo-reorder text-capitalize" icon>
                <v-icon>
                  mdi-backspace
                </v-icon>
              </v-btn>
            </v-col>
            <v-col cols="1" class="d-flex justify-center align-center pa-0 ma-0">
              <v-checkbox
              class="todo-checkbox"
              v-model="task.completed"
              ></v-checkbox>
            </v-col>
            <v-col cols="7" class="d-flex align-center pa-0 ma-0">
              <div class="scrollable-text">
                <p class="text-center mb-0" :class="{ 'completed-task': task.completed }">{{ task.text }}</p>
              </div>
            </v-col>
            <v-col cols="2" class="d-flex justify-center align-center pa-0 ma-0">
              <v-app-bar-nav-icon class="drag-handle"></v-app-bar-nav-icon>
            </v-col>
          </v-row>
        </draggable>
      </v-container>

      <v-container class="fixed">
        <v-row
          position="fixed"
          bottom
          justify="center"
          class="align-center my-0 py-0"
          style="width: 100%; z-index: 1000; margin-bottom: ;"
        >
          <v-col class="d-flex justify-center align-center" cols="1">
            <v-btn small @click="removeAllTask" class="text-capitalize ma-1" icon>
              <v-icon>
                mdi-delete
              </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="8">
            <v-text-field
              label="入力して購入リストに追加"
              class="todo-input"
              color="#F57C00"
              v-model="newTaskText"
            ></v-text-field>
          </v-col>
          <v-col class="d-flex justify-center align-center" cols="1">
            <v-btn small @click="addTask" class="todo-reorder text-capitalize ma-1" icon>
              <v-icon>
                mdi-plus-circle-outline
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>

      <v-dialog v-model="modalOpen" max-width="500">
        <v-card>
          <v-card-title>ブックマークに追加</v-card-title>
          <v-card-text>
            <v-text-field v-model="bookmarkName" label="ブックマーク名"></v-text-field>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="addToBookmarks">追加</v-btn>
            <v-btn @click="closeModal">キャンセル</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-main>
  </div>
</template>


<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import draggable from "vuedraggable";

@Component({
  components: {
    draggable,
  },
})

export default class MainComponent extends Vue {
  tasks: { id: number; text: string; completed: boolean }[] = [];
  bookmarks: { id: number; name: string; tasks: any[] }[] = [];
  nextBookmarkID = Number(localStorage.getItem("nextBookmarkID")) || 1;
  bookmarkName = "";
  checkbox = true;
  newTaskText = "";
  nextTaskID = Number(localStorage.getItem("nextTaskID")) || 1;
  modalOpen = false;
  
  mounted() {
    const storedTasks = localStorage.getItem("tasks");
    const storedBookmarks = localStorage.getItem("bookmarks");
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    } else if (storedBookmarks) {
      this.bookmarks = JSON.parse(storedBookmarks);
    } else {
      return;
    }
  }

  // `task`プロパティの変更を監視
  @Watch("tasks", { deep: true })
  updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  // タスクの追加
  addTask() {
    if (this.newTaskText) {
      this.tasks.push({
        id: this.nextTaskID,
        text: this.newTaskText,
        completed: false,
      });
    }
    if(this.tasks.length === 1) {
      this.$forceUpdate();
    }
    this.nextTaskID++;
    this.newTaskText = "";
    localStorage.setItem("nextTaskID", String(this.nextTaskID));
    console.log(this.tasks);
  }

  // ブックマークを追加
  addToBookmarks() {
  const tasksData = localStorage.getItem("tasks");
  if (tasksData) {
    const tasks = JSON.parse(tasksData);
    const bookmark = {
      id: this.nextBookmarkID,
      name: this.bookmarkName,
      tasks: tasks,
    };
    const storedBookmarks = localStorage.getItem("bookmarks");
    let bookmarks = [];
    if (storedBookmarks) {
      bookmarks = JSON.parse(storedBookmarks);
    }
    this.bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(this.bookmarks));
    this.closeModal();
    this.nextBookmarkID++; // nextBookmarkID をインクリメントする
    localStorage.setItem("nextBookmarkID", String(this.nextBookmarkID));
  }
}

  
  // タスクの削除
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }

  // タスクの完了/未完了の判定
  toggleTaskCompletion(task: { completed: boolean }) {
    task.completed = !task.completed;
   }

  // 全タスクを削除
  removeAllTask() {
    if(window.confirm("すべての買い物リストを削除しますか？")) {
      this.tasks = [];
    }
  }

  // モーダルウィンドウの開閉
  openModal() {
    this.modalOpen = true;
  }
  closeModal() {
    this.modalOpen = false;
    this.bookmarkName = "";
  }

}
</script>

<style>
.completed-task {
  text-decoration: line-through;
}
.scrollable-text {
  overflow-x: auto;
  white-space: nowrap;
}

.fixed {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0;
}

</style>