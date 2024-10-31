import { TaskModel, TaskStatus } from "./types";

export class Task implements TaskModel {
  id!: string; // ! indica ao typescript que a propriedade será inicializada no construtor
  title!: string;
  description!: string;
  status!: TaskStatus;
  createdAt!: Date;
  updatedAt!: Date;

  constructor({
    id,
    description,
    title,
    status = "todo",
    createdAt = new Date(),
    updatedAt = new Date(),
  }: TaskModel) {
    Object.assign(this, {
      id,
      description,
      title,
      status,
      createdAt,
      updatedAt,
    });
  }

  createTask() {}
}
