export interface Task {
  id?: number;
  name: string;
  description: string;
  status: string;
  projectId: number;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}
