import { Task } from "./Task";
import fs from "fs";
import path from "path";
import { TaskStatus } from "./types";

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
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  updateTask(id: string, updatedFields: Partial<Task>) {
    this.tasks = this.tasks.map((task) =>
      task.id === id
        ? { ...task, ...updatedFields, updatedAt: new Date() }
        : task
    );
    this.saveTasks();
  }
  listTasks(status?: TaskStatus | null) {
    if (!status) {
      return this.tasks;
    }
    return this.tasks.filter((task) => task.status === status);
  }
}
