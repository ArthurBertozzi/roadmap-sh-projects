import { Category, ExpenseModel } from "./expense.types";
import { IExpenseRepository } from "./expense.types";

export class ExpenseList {
  private expenses: ExpenseModel[];
  private repository: IExpenseRepository;

  constructor(repository: IExpenseRepository) {
    this.repository = repository;
    this.expenses = this.repository.loadTasks();
  }

  async addExpense(expense: ExpenseModel) {
    this.expenses.push(expense);
    this.repository.saveTasks(this.expenses);
  }

  async removeExpense(id: string) {
    this.expenses = this.expenses.filter((expense) => expense.id !== id);
    this.repository.saveTasks(this.expenses);
  }

  async updateExpense(id: string, data: Partial<ExpenseModel>) {
    this.expenses = this.expenses.map((expense) => {
      return expense.id === id
        ? { ...expense, ...data, updatedAt: new Date() }
        : expense;
    });
  }

  async listExpenses(category?: Category) {
    if (category) {
      return this.expenses.filter((expense) => expense.category === category);
    }
    return this.expenses;
  }

  async summaryExpenses(month?: number) {
    if (month) {
      const filteredArray = this.expenses.filter((expense) => {
        const expenseMonth = new Date(expense.createdAt).getUTCMonth() + 1;
        return expenseMonth === month;
      });
      return filteredArray.reduce((sum, expense) => {
        const amount = parseFloat(expense.amount.replace("R$ ", ""));
        return sum + amount;
      }, 0);
    }

    return this.expenses.reduce((sum, expense) => {
      const amount = parseFloat(expense.amount.replace("R$ ", "").trim());
      return sum + amount;
    }, 0);
  }
}
