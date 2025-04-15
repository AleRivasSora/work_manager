import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task as TaskRepository } from './tasks.entity';
import { Task } from './interfaces/tasks.interfaces';
import { User } from '../users/interfaces/users.interfaces';
import { ResponseWithMessage } from '../users/interfaces/users.interfaces';
import { HttpException } from '@nestjs/common';
import { User as UserRepository } from '../users/users.entity';
import { Project } from '../projects/interfaces/projects.interfaces';
import { Project as ProjectRepository } from '../projects/projects.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepo: Repository<Task>,
    @InjectRepository(UserRepository)
    private userRepo: Repository<User>,
    @InjectRepository(ProjectRepository)
    private projectRepo: Repository<Project>,
  ) {}
  async getAllTasks(userId: number): Promise<ResponseWithMessage<Task[]>> {
    const tasks = await this.taskRepo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .leftJoinAndSelect('project.team', 'team')
      .leftJoinAndSelect('team.users', 'user')
      .where('user.id = :userId', { userId })
      .getMany();

    if (!tasks || tasks.length === 0) {
      throw new HttpException('User has not any task', 404);
    }
    return {
      message: 'Tasks retrieved successfully',
      data: tasks,
    };
  }

  async getTaskById(userId: number, taskId: number) {
    const task = await this.taskRepo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .leftJoinAndSelect('project.team', 'team')
      .where('task.id = :taskId', { taskId })
      .andWhere('team.users = :userId', { userId })
      .getOne();

    if (!task) {
      throw new HttpException(
        'Task not found or user is not part of the task',
        404,
      );
    }

    return {
      message: 'Task retrieved successfully',
      data: task,
    };
  }

  async createTask(task: CreateTaskDto): Promise<ResponseWithMessage<Task>> {
    try {
      const user = await this.userRepo.findOneBy({ id: task.userId });
      if (!user) {
        throw new HttpException('User not found', 404);
      }

      const project = await this.projectRepo.findOneBy({ id: task.projectId });
      if (!project) {
        throw new HttpException('Project not found', 404);
      }

      const taskToCreate = this.taskRepo.create(task);

      const savedTask = await this.taskRepo.save(taskToCreate);

      return {
        message: 'Task created successfully',
        data: savedTask,
      };
    } catch (error) {
      throw new HttpException('Error creating task: ' + error.message, 500);
    }
  }

  async updateTask(task: UpdateTaskDto): Promise<ResponseWithMessage<Task>> {
    try {
      if (task.projectId) {
        const project = await this.projectRepo.findOneBy({
          id: task.projectId,
        });
        if (!project) {
          throw new HttpException('Project not found', 404);
        }
      }
      const taskToUpdate = await this.taskRepo.findOneBy({
        id: task.id,
        userId: task.userId,
      });

      if (!taskToUpdate) {
        throw new HttpException('Task not found', 404);
      }
      const updatedTask = await this.taskRepo.save({
        ...taskToUpdate,
        ...task,
      });
      return {
        message: 'Task updated successfully',
        data: updatedTask,
      };
    } catch (error) {
      throw new HttpException('Error updating task: ' + error.message, 500);
    }
  }

  async asignUserToTask(
    userId: number,
    taskId: number,
  ): Promise<ResponseWithMessage<Task>> {
    const task = await this.taskRepo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .where('task.id = :taskId', { taskId })
      .getOne();

    if (!task) {
      throw new HttpException('Task not found', 404);
    }

    const userInProject = await this.userRepo
      .createQueryBuilder('user')
      .innerJoin('user.projects', 'project')
      .where('user.id = :userId', { userId })
      .andWhere('project.id = :projectId', { projectId: task.projectId })
      .getOne();

    if (!userInProject) {
      throw new HttpException(
        'User is not part of the project associated with this task',
        403,
      );
    }
    try {
      await this.taskRepo
        .createQueryBuilder()
        .update(TaskRepository)
        .set({ user: { id: userInProject.id } })
        .where('id = :taskId', { taskId })
        .execute();

      const updatedTask = await this.taskRepo
        .createQueryBuilder('task')
        .leftJoinAndSelect('task.project', 'project')
        .leftJoinAndSelect('task.user', 'user')
        .where('task.id = :taskId', { taskId })
        .getOne();

      if (!updatedTask) {
        throw new HttpException('Task not found', 404);
      }

      return {
        message: 'User assigned to task successfully',
        data: updatedTask,
      };
    } catch (error) {
      throw new HttpException('Error assigning user to task', 500);
    }
  }

  async removeUserFromTask(
    userId: number,
    taskId: number,
    userToRemoveId: number,
  ): Promise<ResponseWithMessage<Task>> {
    const task = await this.taskRepo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .where('task.id = :taskId', { taskId })
      .getOne();

    if (!task) {
      throw new HttpException('Task not found', 404);
    }

    const userInProject = await this.userRepo
      .createQueryBuilder('user')
      .innerJoin('user.projects', 'project')
      .where('user.id = :userId', { userId })
      .andWhere('project.id = :projectId', { projectId: task.projectId })
      .getOne();

    if (!userInProject) {
      throw new HttpException(
        'User is not part of the project associated with this task',
        403,
      );
    }
    const userToRemove = await this.userRepo
      .createQueryBuilder('user')
      .innerJoin('user.tasks', 'task')
      .where('user.id = :userToRemoveId', { userToRemoveId })
      .andWhere('task.id = :taskId', { taskId })
      .getOne();

    if (!userToRemove) {
      throw new HttpException(
        'User to remove is not assigned to this task',
        404,
      );
    }

    await this.taskRepo
      .createQueryBuilder()
      .relation(TaskRepository, 'user')
      .of(taskId)
      .set(null);

    const updatedTask = await this.taskRepo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .leftJoinAndSelect('task.user', 'user')
      .where('task.id = :taskId', { taskId })
      .getOne();

    if (!updatedTask) {
      throw new HttpException('Task not found', 404);
    }

    return {
      message: 'User removed from task successfully',
      data: updatedTask,
    };
  }

  async getProjectTasks(
    projectId: number,
    userId: number,
  ): Promise<ResponseWithMessage<Task[]>> {
    const userInProject = await this.userRepo
      .createQueryBuilder('user')
      .innerJoin('user.projects', 'project')
      .where('user.id = :userId', { userId })
      .andWhere('project.id = :projectId', { projectId })
      .getOne();

    if (!userInProject) {
      throw new HttpException(
        'User is not part of the project associated with this task',
        403,
      );
    }

    const tasks = await this.taskRepo
      .createQueryBuilder('task')
      .leftJoinAndSelect('task.project', 'project')
      .where('project.id = :projectId', { projectId })
      .getMany();

    if (!tasks || tasks.length === 0) {
      throw new HttpException('Project has not any task', 404);
    }

    return {
      message: 'Tasks retrieved successfully',
      data: tasks,
    };
  }
}
