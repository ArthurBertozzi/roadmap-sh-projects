import { askQuestion, rl } from "./utils/terminal";
import { terminalDialog } from "./constants";
import { TaskList } from "./models/Task/TaskList";
import { Task } from "./models/Task/Task";
import { v4 as uuidv4 } from "uuid";
import { TaskStatus } from "./models/Task/types";

async function showInitialMenu(taskList: TaskList) {
  try {
    console.log(terminalDialog["helloMsg"]);

    const initialOption = await askQuestion(terminalDialog["initialMenu"]);
    console.log("\n");

    switch (initialOption.toString()) {
      case "1":
        await showListMenu(taskList);
        break;
      case "2":
        await createNewTaskMenu(taskList);
        break;
      case "3":
        await updateTaskMenu(taskList);
        break;
      case "4":
        await deleteTaskMenu(taskList);
        break;
      default:
        console.log(terminalDialog["lastMessage"]);
        rl.close();
        return;
    }

    await showInitialMenu(taskList);
  } catch (error) {
    await showInitialMenu(taskList);
  }
}

async function createNewTaskMenu(taskList: TaskList) {
  const title = await askQuestion("Name the title of your task.\n");
  const description = await askQuestion("Create a description for you task.\n");
  const newTask = new Task({
    id: uuidv4(),
    title,
    description,
  });
  taskList.addTask(newTask);
  await showInitialMenu(taskList);
}

async function updateTaskMenu(taskList: TaskList) {
  let status: TaskStatus;
  const updateOption = await askQuestion(terminalDialog["updateTaskOption"]);
  const taskId = await askQuestion("What's your task id?\n");

  switch (updateOption.toString()) {
    case "1":
      const newStatus = await askQuestion(
        terminalDialog["updateNewStatusOption"]
      );
      switch (newStatus.toString()) {
        case "1":
          status = "in-progress";
          taskList.updateTask(taskId, { status });
          break;
        case "2":
          status = "done";
          taskList.updateTask(taskId, { status });
          break;
        default:
          await showInitialMenu(taskList);
          break;
      }
      break;
    case "2":
      let description = await askQuestion("What's the new task description?\n");
      taskList.updateTask(taskId, { description });
      break;
  }

  await showInitialMenu(taskList);
}

async function deleteTaskMenu(taskList: TaskList) {
  const id = await askQuestion(
    "Write the task id that you would like to delete.\n"
  );
  taskList.removeTask(id);
  await showInitialMenu(taskList);
}

async function showListMenu(taskList: TaskList) {
  const listOption = await askQuestion(terminalDialog["listMenu"]);
  console.log("\n");

  switch (listOption.toString()) {
    case "1":
      console.log(terminalDialog["listMessage"]);
      console.log(taskList.listTasks());
      break;
    case "2":
      console.log(terminalDialog["listMessage"]);
      console.log(taskList.listTasks("todo"));
      break;
    case "3":
      console.log(terminalDialog["listMessage"]);
      console.log(taskList.listTasks("in-progress"));
      break;
    case "4":
      console.log(terminalDialog["listMessage"]);
      console.log(taskList.listTasks("done"));
      break;
    default:
      console.log(terminalDialog["listMessage"]);
      console.log(taskList.listTasks());
      break;
  }
}

async function main() {
  const taskList = new TaskList();
  await showInitialMenu(taskList);
}

main();
