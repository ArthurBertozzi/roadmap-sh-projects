import { TaskModel, TaskStatus } from "./types";
import fs from "fs";
import path from "path";

export class TaskList {
  private tasks: TaskModel[] = [];
  private dataFilePath: string;

  constructor(filePath?: string) {
    this.dataFilePath =
      filePath || path.join(__dirname, "../../data/tasks.json");
    this.loadTasks();
  }

  private loadTasks() {
    if (fs.existsSync(this.dataFilePath)) {
      const data = fs.readFileSync(this.dataFilePath, "utf-8");
      this.tasks = JSON.parse(data, (key, value) => {
        if (key === "createdAt" || key === "updatedAt") {
          return new Date(value);
        }
        return value;
      });
    } else {
      this.saveTasks();
    }
  }

  private saveTasks() {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(this.tasks, null, 2));
  }

  addTask(task: TaskModel) {
    this.tasks.push(task);
    this.saveTasks();
  }

  removeTask(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.saveTasks();
  }

  updateTask(id: string, updatedFields: Partial<TaskModel>) {
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
