import { TaskList } from "../models/Task/TaskList";
import * as fs from "fs";
import { TaskStatus, TaskModel } from "../models/Task/types";

jest.mock("fs");

describe("TaskList", () => {
  let taskList: TaskList;
  const mockDataFilePath = "/fake/path/tasks.json";

  // Dados mockados para os testes
  let mockTasks: TaskModel[];

  beforeEach(() => {
    // Resetar mocks antes de cada teste
    jest.resetAllMocks();

    // Dados de tarefas mockadas
    mockTasks = [
      {
        id: "1",
        title: "Tarefa 1",
        description: "Descrição 1",
        status: "todo",
        createdAt: new Date("2021-01-01T00:00:00Z"),
        updatedAt: new Date("2021-01-01T00:00:00Z"),
      },
      {
        id: "2",
        title: "Tarefa 2",
        description: "Descrição 2",
        status: "done",
        createdAt: new Date("2021-01-02T00:00:00Z"),
        updatedAt: new Date("2021-01-02T00:00:00Z"),
      },
    ];

    // Mock das funções do módulo 'fs'
    (fs.existsSync as jest.Mock).mockReturnValue(true);
    (fs.readFileSync as jest.Mock).mockReturnValue(JSON.stringify(mockTasks));
    (fs.writeFileSync as jest.Mock).mockImplementation(() => {});

    // Instancia a TaskList com o caminho do arquivo mockado
    taskList = new TaskList(mockDataFilePath);
  });

  it("deve carregar as tarefas do arquivo na inicialização", () => {
    expect(fs.readFileSync).toHaveBeenCalledWith(mockDataFilePath, "utf-8");
    expect(taskList.listTasks()).toEqual(mockTasks);
  });

  it("deve adicionar uma nova tarefa", () => {
    const newTask: TaskModel = {
      id: "3",
      title: "Tarefa 3",
      description: "Descrição 3",
      status: "todo",
      createdAt: new Date("2021-01-03T00:00:00Z"),
      updatedAt: new Date("2021-01-03T00:00:00Z"),
    };

    taskList.addTask(newTask);

    const expectedTasks = [...mockTasks, newTask];
    expect(taskList.listTasks()).toEqual(expectedTasks);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      mockDataFilePath,
      JSON.stringify(expectedTasks, null, 2)
    );
  });

  it("deve remover uma tarefa pelo ID", () => {
    const idToRemove = "1";
    taskList.removeTask(idToRemove);

    const expectedTasks = mockTasks.filter((task) => task.id !== idToRemove);
    expect(taskList.listTasks()).toEqual(expectedTasks);
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      mockDataFilePath,
      JSON.stringify(expectedTasks, null, 2)
    );
  });

  it("deve atualizar uma tarefa pelo ID", () => {
    const idToUpdate = "2";
    const updatedFields: Partial<TaskModel> = { status: "in-progress" };

    taskList.updateTask(idToUpdate, updatedFields);

    const updatedTask = {
      ...mockTasks.find((task) => task.id === idToUpdate)!,
      ...updatedFields,
      updatedAt: expect.any(Date),
    };

    expect(taskList.listTasks()).toEqual(
      expect.arrayContaining([expect.objectContaining(updatedTask)])
    );
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it("deve listar tarefas por status", () => {
    const statusToFilter: TaskStatus = "todo";
    const filteredTasks = taskList.listTasks(statusToFilter);

    const expectedTasks = mockTasks.filter(
      (task) => task.status === statusToFilter
    );

    expect(filteredTasks).toEqual(expectedTasks);
  });

  it("deve retornar todas as tarefas quando nenhum status é fornecido", () => {
    const allTasks = taskList.listTasks();

    expect(allTasks).toEqual(mockTasks);
  });
});
