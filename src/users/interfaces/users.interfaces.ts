export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  teams?: Team[];
  projects?: string[];
}

export interface ResponseWithMessage<T> {
  message: string;
  data?: T | T[];
}

interface Team {
  id: number;
  name: string;
  description: string;
  users?: User[];
  projects?: string[];
}
