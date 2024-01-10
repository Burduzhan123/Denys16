class TodoList {
  constructor() {
      this.tasks = [];
  }

  addTask(taskText) {
      if (taskText.trim() === "") {
          alert("Task cannot be empty!");
          return;
      }

      const now = new Date();
      const task = {
          id: this.generateId(),
          text: taskText,
          completed: false,
          creationDate: now,
          lastEditDate: now
      };

      this.tasks.push(task);
      this.renderTasks();
  }

  removeTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId);
      this.renderTasks();
  }

  editTask(taskId, newText) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
          task.text = newText;
          task.lastEditDate = new Date();
          this.renderTasks();
      }
  }

  toggleTaskCompletion(taskId) {
      const task = this.tasks.find(task => task.id === taskId);
      if (task) {
          task.completed = !task.completed;
          task.lastEditDate = new Date();
          this.renderTasks();
      }
  }

  getTaskInfo(taskId) {
      const task = this.tasks.find(task => task.id === taskId);
      return task ? task : null;
  }

  getAllTasks() {
      return this.tasks;
  }

  getIncompleteTasksCount() {
      return this.tasks.filter(task => !task.completed).length;
  }

  findTasks(filter) {
      return this.tasks.filter(task => {
          return task.text.toLowerCase().includes(filter.toLowerCase()) ||
                 task.creationDate.toISOString().includes(filter) ||
                 task.lastEditDate.toISOString().includes(filter);
      });
  }

  sortTasks(criteria) {
      this.tasks.sort((a, b) => {
          if (criteria === "completed") {
              return a.completed - b.completed;
          } else if (criteria === "creationDate") {
              return a.creationDate - b.creationDate;
          } else if (criteria === "lastEditDate") {
              return a.lastEditDate - b.lastEditDate;
          } else {
              return 0;
          }
      });
      this.renderTasks();
  }

  renderTasks() {
      const taskList = document.getElementById("taskList");
      taskList.innerHTML = "";

      this.tasks.forEach(task => {
          const listItem = document.createElement("li");
          listItem.textContent = task.text;

          const deleteButton = document.createElement("button");
          deleteButton.textContent = "Delete";
          deleteButton.onclick = () => this.removeTask(task.id);

          const editButton = document.createElement("button");
          editButton.textContent = "Edit";
          editButton.onclick = () => {
              const newText = prompt("Enter new task text:", task.text);
              if (newText !== null) {
                  this.editTask(task.id, newText);
              }
          };

          const completeCheckbox = document.createElement("input");
          completeCheckbox.type = "checkbox";
          completeCheckbox.checked = task.completed;
          completeCheckbox.onchange = () => this.toggleTaskCompletion(task.id);

          listItem.appendChild(completeCheckbox);
          listItem.appendChild(document.createTextNode(task.text + ' '));
          listItem.appendChild(editButton);
          listItem.appendChild(deleteButton);

          taskList.appendChild(listItem);
      });
  }

  logAllTasks() {
      console.log("All Tasks:");
      this.tasks.forEach(task => {
          console.log(`[${task.completed ? 'X' : ' '}] ${task.text}`);
      });
      console.log("------------------");
  }

  logIncompleteTasksCount() {
      const incompleteCount = this.getIncompleteTasksCount();
      console.log(`Total Tasks: ${this.tasks.length}`);
      console.log(`Incomplete Tasks: ${incompleteCount}`);
  }


  generateId() {
      return '_' + Math.random().toString(36).substr(2, 9);
  }
}

const todoList = new TodoList();

// Добавление заметок с использованием интерфейса
todoList.addTask("Поспать");
todoList.addTask("Приготовить");
todoList.addTask("Поработать");

// Изменение заметки и вывод информации о ней
todoList.editTask(todoList.tasks[0].id, "Поспать (изменено)");
console.log("Task Info:");
console.log(todoList.getTaskInfo(todoList.tasks[0].id));
console.log("------------------");

// Поиск заметок по тексту или дате
const foundTasks = todoList.findTasks("приготовить");
console.log("Found Tasks:");
console.log(foundTasks);
console.log("------------------");

// Сортировка заметок по различным критериям
todoList.sortTasks("completed");
console.log("Sorted Tasks (by completed status):");
todoList.sortTasks("creationDate");
console.log("Sorted Tasks (by creation date):");
todoList.sortTasks("lastEditDate");
console.log("Sorted Tasks (by last edit date):");
