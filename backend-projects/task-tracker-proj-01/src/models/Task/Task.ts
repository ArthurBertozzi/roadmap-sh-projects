import { TaskModel, TaskStatus } from "./types";

export class Task implements TaskModel {
  id?: string; // ! indicates to typescript that the property will be initialized in the constructor
  title!: string;
  description!: string;
  status?: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;

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
}
