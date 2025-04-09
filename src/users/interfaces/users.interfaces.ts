export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  team?: string[];
  projects?: string[];
}

export interface ResponseWithMessage<T> {
  message: string;
  data: T;
}
