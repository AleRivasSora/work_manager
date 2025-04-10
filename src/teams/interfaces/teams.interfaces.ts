import { User } from '../../users/interfaces/users.interfaces';

export interface Team {
  id: number;
  name: string;
  description: string;
  users?: User[];
  projects?: string[];
}
