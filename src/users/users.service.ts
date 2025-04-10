import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, ResponseWithMessage } from './interfaces/users.interfaces';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User as UserEntity } from './users.entity';
import * as bcrypt from 'bcrypt';
import { classToPlain } from 'class-transformer';
import { Team } from '../teams/interfaces/teams.interfaces'; //
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

  async getMe(user: User) {
    const currentUser = await this.userRepository.findOneBy({ id: user.id });
    if (!currentUser) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    const userWithoutPassword = classToPlain(currentUser) as User;
    return {
      message: 'User profile retrieved successfully',
      data: userWithoutPassword,
    };
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

    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);

    const newUser = this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);

    const userWithoutPassword = classToPlain(savedUser) as User;
    return {
      message: 'User created successfully',
      data: userWithoutPassword,
    };
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

  async getUserTeams(userId: number): Promise<ResponseWithMessage<Team[]>> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['teams'],
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    if (!user.teams || user.teams.length === 0) {
      throw new HttpException('User has no teams', HttpStatus.NOT_FOUND);
    }

    const teams = user.teams.map((team) => ({
      id: team.id,
      name: team.name,
      description: team.description,
    }));
    return {
      message: 'User teams retrieved successfully',
      data: teams,
    };
  }
}
