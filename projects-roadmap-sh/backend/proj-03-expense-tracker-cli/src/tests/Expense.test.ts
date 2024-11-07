// expense.test.ts
import { Expense } from "../models/Expense";
import { ExpenseModel } from "../models/expense.types";

describe("Expense Class", () => {
  it("should create an instance of Expense with valid data", () => {
    const validExpense: ExpenseModel = {
      description: "Lunch",
      amount: "25.50",
      category: "Food",
      createdAt: new Date("2024-01-01T00:00:00Z"),
    };

    const expense = new Expense(validExpense);

    expect(expense).toBeInstanceOf(Expense);
    expect(expense.description).toBe("Lunch");
    expect(expense.amount).toBe("R$ 25.50");
    expect(expense.category).toBe("Food");
    expect(expense.id).toBeDefined();
    expect(expense.createdAt).toBeInstanceOf(Date);
    expect(expense.updatedAt).toBeInstanceOf(Date);
  });

  it("should throw an error when created with a negative amount", () => {
    const invalidExpense: ExpenseModel = {
      description: "Lunch",
      amount: "-25.50",
      category: "Food",
      createdAt: new Date("2024-01-01T00:00:00Z"),
    };

    expect(() => new Expense(invalidExpense)).toThrow(
      "Impossible to add a new expense with negative value."
    );
  });

  it("should set default values for category, createdAt, and updatedAt when not provided", () => {
    const validExpense: ExpenseModel = {
      description: "Lunch",
      amount: "25.50",
      createdAt: new Date("2024-01-01T00:00:00Z"),
    };

    const expense = new Expense(validExpense);

    expect(expense.category).toBe("Other");
    expect(expense.createdAt).toBeInstanceOf(Date);
    expect(expense.updatedAt).toBeInstanceOf(Date);
  });

  it('should correctly format the amount with "R$"', () => {
    const validExpense: ExpenseModel = {
      description: "Lunch",
      amount: "7.30",
      category: "Food",
      createdAt: new Date("2024-01-01T00:00:00Z"),
    };

    const expense = new Expense(validExpense);

    expect(expense.amount).toBe("R$ 7.30");
  });
});
