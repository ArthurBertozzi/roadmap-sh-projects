import { Category, ExpenseModel } from "./expense.types";
import { v4 as uuidv4 } from "uuid";

export class Expense implements ExpenseModel {
  id?: string | undefined;
  description!: string;
  category?: Category;
  createdAt!: Date;
  updatedAt?: Date;
  amount!: string;

  constructor({
    id = uuidv4(),
    description,
    amount,
    category = "Other",
    createdAt = new Date(),
    updatedAt = new Date(),
  }: ExpenseModel) {
    if (parseFloat(amount) < 0) {
      throw new Error("Impossible to add a new expense with negative value.");
    }

    amount = `R$ ${amount}`;

    Object.assign(this, {
      id,
      description,
      amount,
      category,
      createdAt,
      updatedAt,
    });
  }
}
