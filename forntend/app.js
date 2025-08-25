const { createApp } = Vue;

createApp({
  data() {
    return {
      newTask: "",
      tasks: []
    };
  },
  methods: {
    async loadTasks() {
      const res = await fetch("/task");
      this.tasks = await res.json();
    },
    async addTask() {
      if (!this.newTask.trim()) return;

      await fetch("/task", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: this.newTask, completed: false })
      });

      this.newTask = "";
      this.loadTasks();
    },
    async deleteTask(id) {
      await fetch(`/task/${id}`, { method: "DELETE" });
      this.loadTasks();
    },
    async toggleComplete(task) {
      task.completed = !task.completed;
      await fetch(`/task/${task._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
      });
      this.loadTasks();
    }
  },
  mounted() {
    this.loadTasks();
  }
}).mount("#app");
