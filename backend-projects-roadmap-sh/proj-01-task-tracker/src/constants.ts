export const terminalDialog = {
  helloMsg:
    "\nWelcome to task-tracker App\nSelect one of the options below.\n\n",
  initialMenu: `What you need to do?

    [1] - List your tasks.
    [2] - Create a task.
    [3] - Update a task data or status.
    [4] - Delete a task.
    [5] - Leave
    \n`,

  lastMessage: "Thank you! See you later.",
  listMenu: `Do you wish to filter your task list?
  
  [1] - No, I want it all.
  [2] - Only in todo status.
  [3] - Only in in-progress status.
  [4] - Only in done status.
  \n`,
  listMessage: "Here's your list!\n",
  updateTaskOption: `What you would like to update in your task?
  [1] - Status
  [2] - Description
  \n`,
  updateNewStatusOption: `
  [1] In Progress
  [2] Done
  \n`,
};
