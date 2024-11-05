import { TaskModel, TaskStatus } from "./types";
import { v4 as uuidv4 } from "uuid";

export class Task implements TaskModel {
  id?: string; // ! indicates to typescript that the property will be initialized in the constructor
  title!: string;
  description!: string;
  status?: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({
    id = uuidv4(),
    description,
    title,
    status = "todo",
    createdAt = new Date(),
    updatedAt = new Date(),
  }: TaskModel) {
    if (!title) {
      throw new Error("Title is required");
    }

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
