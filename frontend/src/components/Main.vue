<template>
  <v-main>
    <v-container>
      <draggable v-model="tasks" :animation="300" @end="onTaskOrderChange">
        <v-row v-for="task in tasks" :key="task.id" class="mr-auto ml-auto">
          <v-col class="d-flex align-center pt-1 pa-0 bg-surface-variant">
            <v-checkbox
              style="transform: scale(0.6); background-color: rebeccapurple;"
              label="do"
              class="todo-checkbox"
              color="orange"
              hide-details
              @change="toggleTaskCompletion(task)"
            ></v-checkbox>
            <v-text-field
              label="what to buy...?"
              class="todo-input"
              :class="{ 'completed-task': task.completed }"
              v-model="task.text"
            ></v-text-field>
            <div class="ma-1">
              <v-btn x-small @click="addTask" class="todo-reorder text-capitalize ma-1">+</v-btn>
              <v-btn x-small @click="deleteTask(task.id)" class="todo-reorder text-capitalize ma-1" :disabled="tasks.length === 1">-</v-btn>
            </div>
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

  nextTaskID = 2;

  mounted() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      this.tasks = JSON.parse(storedTasks);
    }
  }

  addTask() {
    this.tasks.push({
      id: this.nextTaskID,
      text: "",
      completed: false,
    });
    this.nextTaskID++;
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    console.log(this.tasks);
  }
  
  deleteTask(id: number) {
    this.tasks = this.tasks.filter(task => task.id !== id);
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
    console.log(this.tasks);
  }

  toggleTaskCompletion(task: { completed: boolean }) {
    task.completed = !task.completed;
   }
   
  onTaskOrderChange(event: any) {
  // タスク順序が変更された後の処理をここで行うことができます。
  // 例えば、新しい順序をデータベースに保存するなど。
  }
}
</script>

<style>
.completed-task {
  text-decoration: line-through;
}
</style>