# Expense Tracker Application

## Overview

A simple command-line expense tracker application to manage your finances. This application allows users to add, update, delete, and view their expenses, along with providing a summary of expenses.

## Requirements

The application should have the following features:

- **Add an expense** with a description and amount.
- **Update an expense**.
- **Delete an expense**.
- **View all expenses**.
- **View a summary** of all expenses.
- **View a summary of expenses** for a specific month (of the current year).

### Additional Features (Optional)

Consider adding these features for an enhanced experience:

- **Expense categories** with filtering options.
- **Monthly budget setting** with warnings for exceeded budgets.
- **Export expenses** to a CSV file.

## Example Commands and Output

```bash
$ expense-tracker add --description "Lunch" --amount 20
# Expense added successfully (ID: 1)

$ expense-tracker add --description "Dinner" --amount 10
# Expense added successfully (ID: 2)

$ expense-tracker list
# ID  Date       Description  Amount
# 1   2024-08-06  Lunch        $20
# 2   2024-08-06  Dinner       $10

$ expense-tracker summary
# Total expenses: $30

$ expense-tracker delete --id 1
# Expense deleted successfully

$ expense-tracker summary
# Total expenses: $20

$ expense-tracker summary --month 8
# Total expenses for August: $20
```

## Implementation Details

- **Programming Language**: Use any language of your choice (e.g., Python, Node.js).
- **Argument Parsing**: Use available modules for parsing command-line arguments (e.g., `argparse` for Python, `commander` for Node.js).
- **Data Storage**: Use a simple text file (e.g., JSON or CSV) to store expenses data.
- **Error Handling**: Ensure to handle invalid inputs and edge cases (e.g., negative amounts, non-existent IDs).
- **Code Modularity**: Implement functions to keep the code modular, maintainable, and easy to test.
