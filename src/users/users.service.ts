import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, ResponseWithMessage } from './interfaces/users.interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './users.entity';

@Injectable({})
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<User>,
  ) {}

  private async isEmailTaken(
    email?: string,
    excludeUserId?: number,
  ): Promise<boolean> {
    if (!email) {
      return false;
    }
    const user = await this.userRepository.findOne({
      where: { email },
    });

    if (user && user.id !== excludeUserId) {
      return true;
    }
    return false;
  }

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

  async createUser(user: CreateUserDto): Promise<ResponseWithMessage<User>> {
    const isTaken = await this.isEmailTaken(user.email);
    if (isTaken) {
      throw new HttpException('Email already taken', HttpStatus.BAD_REQUEST);
    }

    const newUser = this.userRepository.create(user);
    const savedUser = this.userRepository.save(newUser);
    return savedUser.then((user) => {
      return {
        message: 'User created successfully',
        data: user,
      };
    });
  }

  async updateUser(user: UpdateUserDto) {
    const isTaken = await this.isEmailTaken(user.email);
    if (isTaken) {
      throw new HttpException('Email already taken', HttpStatus.BAD_REQUEST);
    }
    const userToUpdate = await this.userRepository.findOneBy({
      email: user.email,
    });
    if (!userToUpdate) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const updatedUser = this.userRepository.merge(userToUpdate, user);
    const savedUser = this.userRepository.save(updatedUser);
    return savedUser.then((user) => {
      return {
        message: 'User updated successfully',
        data: user,
      };
    });
  }

  getUserTeams() {}
}
