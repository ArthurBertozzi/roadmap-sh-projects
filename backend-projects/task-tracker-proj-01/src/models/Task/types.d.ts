type TaskStatus = "todo" | "in-progress" | "done";

export interface TaskModel {
  id?: string;
  title: string;
  description: string;
  status?: TaskStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
