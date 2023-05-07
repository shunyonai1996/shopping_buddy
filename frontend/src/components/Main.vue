<template>
  <v-main>
    <v-container>
      <v-row justify="center" class="align-center my-0 py-0 mb-5" style="min-height: 40px; max-height: 40px;">
        <v-col class="d-flex align-center" cols=2>
          <v-btn small @click="addTask" class="todo-reorder text-capitalize ma-1" icon>
            <v-icon>
              mdi-plus-circle-outline
            </v-icon>
          </v-btn>
        </v-col>
        <v-col cols=9>
          <v-text-field
          label="何が必要？"
          class="todo-input"
          v-model="newTaskText"
          ></v-text-field>
        </v-col>
      </v-row>

      <draggable 
      v-model="tasks"
      :animation="300"
      @end="onTaskOrderChange"
      handle=".drag-handle">
        <v-row v-for="(task, index) in tasks" :key="task.id" class="align-center my-0 py-0" style="min-height: 40px; max-height: 40px;">

          <v-col cols="2" class="d-flex justify-center align-center pa-0 ma-0">
            <v-app-bar-nav-icon class="drag-handle"></v-app-bar-nav-icon>
          </v-col>

          <v-col cols="1" class="d-flex justify-center align-center pa-0 ma-0">
            <v-checkbox
            class="todo-checkbox"
            @change="toggleTaskCompletion(task)"
            ></v-checkbox>
          </v-col>
          <v-col cols="7" class="d-flex align-center pa-0 ma-0">
            <div class="scrollable-text">
              <p class="text-center mb-0" :class="{ 'completed-task': task.completed }">{{ task.text }}</p>
            </div>
          </v-col>
          <v-col cols="2" class="d-flex align-center pa-0 ma-0">
            <v-btn small @click="deleteTask(index)" class="todo-reorder text-capitalize" icon>
              <v-icon>
                mdi-backspace
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </draggable>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import draggable from "vuedraggable";

@Component({
  components: {
    draggable,
  },
})
export default class MainComponent extends Vue {
  tasks = [
    {
      id: 1,
      text: "",
      completed: false,
    },
  ];
  checkbox = true;
  newTaskText = "";
  nextTaskID = Number(localStorage.getItem("nextTaskID")) || 2;

  mounted() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }
  
  // watch() {
  //   console.log(this.tasks);
  // }

  addTask() {
    if (this.newTaskText) {
      this.tasks.push({
        id: this.nextTaskID,
        text: this.newTaskText,
        completed: false,
      });
    }
    this.nextTaskID++;
    this.newTaskText = "";
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    localStorage.setItem("nextTaskID", String(this.nextTaskID));
    console.log(this.tasks);
  }
  
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  toggleTaskCompletion(task: { completed: boolean }) {
    task.completed = !task.completed;
   }

  onTaskOrderChange(event: any) {
  // タスク順序が変更された後の処理をここで行うことができます。
  // 例えば、新しい順序をデータベースに保存するなど。
  localStorage.setItem("tasks", JSON.stringify(this.tasks));
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

</style>