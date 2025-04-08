import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface User {
  id: number;
  name: string;
  lastName: string;
  email: string;
  team?: string[];
  projects?: string[];
}

@Injectable({})
export class UsersService {
  getMe() {
    return 'Get me';
  }

  getAllUsers(pagination?: { page: number; limit: number }): User[] {
    return [
      { id: 1, name: 'John ', lastName: 'Doe', email: 'john.doe@example.com' },
    ];
  }

  getUserById(id: number) {
    return 'User by id';
  }

  createUser(user: CreateUserDto) {
    return 'Create user';
  }

  updateUser(user: UpdateUserDto) {
    return 'Update user';
  }

  getUserTeams() {
    return 'Get user teams';
  }
}
