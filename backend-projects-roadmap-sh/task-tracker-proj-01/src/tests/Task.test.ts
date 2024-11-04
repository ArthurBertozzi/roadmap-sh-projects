import { Task } from "../models/Task/Task";
import { TaskModel, TaskStatus } from "../models/Task/types";
import { validate as uuidValidate, version as uuidVersion } from "uuid";

describe("Task", () => {
  it("deve criar uma tarefa com todos os campos fornecidos", () => {
    const expectedTask: TaskModel = {
      id: "1",
      title: "Tarefa",
      description: "Nova tarefa",
      status: "in-progress",
      createdAt: new Date("2021-01-01T00:00:00Z"),
      updatedAt: new Date("2021-01-02T00:00:00Z"),
    };

    const newTask = new Task(expectedTask);

    expect(newTask).toEqual(expectedTask);
  });

  it("deve atribuir valores padrão quando campos opcionais não são fornecidos", () => {
    const taskData: TaskModel = {
      id: "2",
      title: "Outra Tarefa",
      description: "Descrição da tarefa",
    };

    const newTask = new Task(taskData);

    expect(newTask.id).toBe("2");
    expect(newTask.title).toBe("Outra Tarefa");
    expect(newTask.description).toBe("Descrição da tarefa");
    expect(newTask.status).toBe("todo"); // Valor padrão
    expect(newTask.createdAt).toBeInstanceOf(Date);
    expect(newTask.updatedAt).toBeInstanceOf(Date);
  });

  it("deve permitir criar uma tarefa sem fornecer um ID retorna um ID com uuid v4", () => {
    const taskData: TaskModel = {
      title: "Tarefa sem ID no construtor",
      description: "Descrição da tarefa sem ID",
    };

    const newTask = new Task(taskData);

    expect(typeof newTask.id).toBe("string");
    expect(uuidValidate(newTask.id!)).toBe(true);
    expect(uuidVersion(newTask.id!)).toBe(4);
    expect(newTask.title).toBe("Tarefa sem ID no construtor");
    expect(newTask.description).toBe("Descrição da tarefa sem ID");
    expect(newTask.status).toBe("todo");
    expect(newTask.createdAt).toBeInstanceOf(Date);
    expect(newTask.updatedAt).toBeInstanceOf(Date);
  });

  it("deve permitir criar uma tarefa com descrição vazia", () => {
    const taskData: TaskModel = {
      id: "3",
      title: "Tarefa sem Descrição",
      description: "",
    };

    const newTask = new Task(taskData);

    expect(newTask.id).toBe("3");
    expect(newTask.title).toBe("Tarefa sem Descrição");
    expect(newTask.description).toBe("");
    expect(newTask.status).toBe("todo");
    expect(newTask.createdAt).toBeInstanceOf(Date);
    expect(newTask.updatedAt).toBeInstanceOf(Date);
  });

  // Se houver validações, por exemplo, título obrigatório
  it("deve lançar um erro se o título não for fornecido", () => {
    const taskData: Partial<TaskModel> = {
      id: "4",
      description: "Descrição sem título",
    };

    expect(() => new Task(taskData as TaskModel)).toThrow();
  });
});
