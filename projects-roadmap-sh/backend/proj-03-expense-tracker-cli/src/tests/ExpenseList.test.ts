// expenseList.test.ts
import { ExpenseList } from "../models/ExpenseList";
import { ExpenseModel, IExpenseRepository } from "../models/expense.types";

describe("ExpenseList Class", () => {
  let mockRepository: jest.Mocked<IExpenseRepository>;
  let expenseList: ExpenseList;

  beforeEach(() => {
    mockRepository = {
      loadTasks: jest.fn().mockReturnValue([
        {
          id: "1",
          description: "Groceries",
          amount: "R$ 50.00",
          category: "Food",
          createdAt: new Date("2024-08-01"),
        },
        {
          id: "2",
          description: "Fuel",
          amount: "R$ 100.00",
          category: "Transport",
          createdAt: new Date("2024-08-03"),
        },
      ]),
      saveTasks: jest.fn(),
    };

    expenseList = new ExpenseList(mockRepository);
  });

  it("should load expenses from the repository on initialization", () => {
    expect(mockRepository.loadTasks).toHaveBeenCalled();
    expect(expenseList.listExpenses()).resolves.toHaveLength(2);
  });

  it("should add a new expense and save it", async () => {
    const newExpense: ExpenseModel = {
      id: "3",
      description: "Dinner",
      amount: "R$ 30.00",
      category: "Food",
      createdAt: new Date("2024-08-06"),
    };

    await expenseList.addExpense(newExpense);
    expect(mockRepository.saveTasks).toHaveBeenCalledWith(
      expect.arrayContaining([newExpense])
    );
  });

  it("should remove an expense by ID and save the changes", async () => {
    await expenseList.removeExpense("1");
    expect(mockRepository.saveTasks).toHaveBeenCalledWith(
      expect.not.arrayContaining([{ id: "1" }])
    );
  });

  it("should update an existing expense and update the updatedAt field", async () => {
    const updatedData: Partial<ExpenseModel> = {
      description: "Updated Groceries",
      amount: "R$ 60.00",
    };

    await expenseList.updateExpense("1", updatedData);
    const updatedExpense = (await expenseList.listExpenses()).find(
      (exp) => exp.id === "1"
    );

    expect(updatedExpense).toMatchObject(updatedData);
    expect(updatedExpense?.updatedAt).toBeInstanceOf(Date);
  });

  it("should return expenses filtered by category", async () => {
    const filteredExpenses = await expenseList.listExpenses("Food");
    expect(filteredExpenses).toHaveLength(1);
    expect(filteredExpenses[0].category).toBe("Food");
  });

  it("should calculate the total amount of expenses for a given month", async () => {
    const totalAmount = await expenseList.summaryExpenses(8); // Agosto
    expect(totalAmount).toBe(150.0); // R$ 50.00 + R$ 100.00
  });

  it("should calculate the total amount of all expenses when no month is provided", async () => {
    const totalAmount = await expenseList.summaryExpenses();
    expect(totalAmount).toBe(150.0);
  });
});
