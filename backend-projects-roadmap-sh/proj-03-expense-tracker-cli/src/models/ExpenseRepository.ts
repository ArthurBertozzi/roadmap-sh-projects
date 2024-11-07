import * as path from "path";
import fs from "fs";
import { ExpenseModel, IExpenseRepository } from "./expense.types";

export class FileExpenseRepository implements IExpenseRepository {
  private dataFilePath: string;

  constructor(filePath?: string) {
    this.dataFilePath =
      filePath || path.join(__dirname, "../../src/data/expenses.json");
  }

  loadTasks(): ExpenseModel[] {
    if (fs.existsSync(this.dataFilePath)) {
      const data = fs.readFileSync(this.dataFilePath, "utf-8");
      return JSON.parse(data, (key, value) => {
        if (key === "createdAt") {
          return new Date(value);
        }
        return value;
      });
    } else {
      this.saveTasks([]);
      return [];
    }
  }

  saveTasks(tasks: ExpenseModel[]): void {
    fs.writeFileSync(this.dataFilePath, JSON.stringify(tasks, null, 2));
  }
}
