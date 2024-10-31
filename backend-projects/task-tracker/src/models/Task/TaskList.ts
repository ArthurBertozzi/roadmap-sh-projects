import { Task } from "./Task";
import fs from "fs";
import path from "path";

const dataFilePath = path.join(__dirname, "../../data/tasks.json");

export class TaskList {
  private tasks: Task[] = [];

  constructor() {
    this.loadTasks();
  }

  private loadTasks() {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, "utf-8");
      this.tasks = JSON.parse(data);
    } else {
      this.saveTasks(); // Create file if don't exist
    }
  }

  private saveTasks() {
    fs.writeFileSync(dataFilePath, JSON.stringify(this.tasks, null, 2));
  }

  addTask(task: Task) {
    this.tasks.push(task);
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  updateTask(id: string, updatedFields: Partial<Task>) {
    this.tasks.map((task) =>
      task.id === id ? { ...task, ...updatedFields } : task
    );
    this.saveTasks();
  }
  listTasks() {
    return this.tasks;
  }
}
