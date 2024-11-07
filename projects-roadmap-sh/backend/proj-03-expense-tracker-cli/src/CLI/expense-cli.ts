import { Command } from "commander";
import { ExpenseList } from "../models/ExpenseList"; // A classe que implementa a lista de despesas
import { FileExpenseRepository } from "../models/ExpenseRepository"; // Repositório de arquivos
import { Expense } from "../models/Expense"; // Classe que cria despesas
import { ExpenseModel } from "../models/expense.types"; // Tipos

const program = new Command();

// Cria uma instância do repositório e da lista de despesas
const repository = new FileExpenseRepository();
const expenseList = new ExpenseList(repository);

// Função para formatar valores monetários

program
  .name("expense-tracker")
  .description("CLI para gerenciar despesas")
  .version("1.0.0");

// Comando "add" para adicionar uma nova despesa
program
  .command("add")
  .description("Adiciona uma nova despesa")
  .requiredOption("--description <description>", "Descrição da despesa")
  .requiredOption("--amount <amount>", "Valor da despesa")
  .option("--category <category>", "Categoria da despesa")
  .action(async (options) => {
    const { description, amount, category } = options;
    const expense = new Expense({
      description,
      amount,
      createdAt: new Date(),
      category,
    });

    await expenseList.addExpense(expense);

    console.log(`Expense added successfully (ID: ${expense.id})`);
  });

// Comando "list" para listar as despesas
program
  .command("list")
  .description("Lista todas as despesas")
  .action(async () => {
    const expenses = await expenseList.listExpenses();
    console.log("ID    Date       Description  Amount");
    expenses.forEach((expense: ExpenseModel) => {
      const formattedAmount = expense.amount;
      console.log(
        `${expense.id}  ${expense.createdAt.toISOString().slice(0, 10)}  ${
          expense.description
        }  ${formattedAmount}`
      );
    });
  });

// Comando "delete" para deletar uma despesa
program
  .command("delete")
  .description("Deleta uma despesa")
  .requiredOption("--id <id>", "ID da despesa")
  .action(async (options) => {
    const { id } = options;
    await expenseList.removeExpense(id);
    console.log("Expense deleted successfully");
  });

// Comando "summary" para calcular o total de despesas
program
  .command("summary")
  .description("Exibe o total de despesas")
  .option("--month <month>", "Mês para filtrar as despesas (1 a 12)")
  .action(async (options) => {
    const { month } = options;
    const total = await expenseList.summaryExpenses(
      month ? parseInt(month) : undefined
    );

    if (month) {
      console.log(`Total expenses for month ${month}: ${total}`);
    } else {
      console.log(`Total expenses: ${total}`);
    }
  });

export default program;
