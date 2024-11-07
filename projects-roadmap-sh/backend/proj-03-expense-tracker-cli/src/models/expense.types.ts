export type Category = "Food" | "Study" | "Job" | "Other";

export interface ExpenseModel {
  id?: string;
  description: string;
  createdAt: Date;
  updatedAt?: Date;
  amount: string;
  category?: Category;
}

export interface IExpenseRepository {
  loadTasks(): ExpenseModel[];
  saveTasks(tasks: ExpenseModel[]): void;
}
