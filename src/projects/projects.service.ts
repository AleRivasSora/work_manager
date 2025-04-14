import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project as ProjectRepository } from './projects.entity';
import { Project } from './interfaces/projects.interfaces';
import { User } from '../users/interfaces/users.interfaces';
import { ResponseWithMessage } from '../users/interfaces/users.interfaces';
import { HttpException } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { Team } from '../teams/interfaces/teams.interfaces';
import { Team as TeamRepository } from '../teams/teams.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(TeamRepository)
    private teamRepo: Repository<TeamRepository>,
    @InjectRepository(ProjectRepository)
    private projectRepo: Repository<Project>,
  ) {}

  async getAllProjects(user: User): Promise<ResponseWithMessage<Project[]>> {
    const projects = await this.projectRepo
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.team', 'team')
      .leftJoinAndSelect('team.users', 'user')
      .where('user.id = :userId', { userId: user.id })
      .getMany();

    if (!projects || projects.length === 0) {
      throw new HttpException('User has not any project', 404);
    }

    return {
      message: 'Projects retrieved successfully',
      data: projects,
    };
  }

  async getProjectById(
    id: number,
    userId: number,
  ): Promise<ResponseWithMessage<Project>> {
    const project = await this.projectRepo
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.team', 'team')
      .leftJoinAndSelect('team.users', 'user')
      .where('project.id = :id', { id })
      .andWhere('user.id = :userId', { userId })
      .getOne();

    if (!project) {
      throw new HttpException(
        'Project not found or user is not part of the project',
        404,
      );
    }
    return {
      message: 'Project retrieved successfully',
      data: project,
    };
  }

  async createProject(
    newProject: CreateProjectDto,
    userId: number,
  ): Promise<ResponseWithMessage<Project>> {
    const team = await this.teamRepo
      .createQueryBuilder('team')
      .leftJoinAndSelect('team.users', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('team.id = :teamId', { teamId: newProject.teamId })
      .getOne();

    if (!team) {
      throw new HttpException(
        'Team not found or user is not part of the team',
        404,
      );
    }
    const project = this.projectRepo.create(newProject);

    const savedProject = await this.projectRepo.save(project);

    return {
      message: 'Project created successfully',
      data: savedProject,
    };
  }

  async updateProject(
    userId: number,
    id: number,
  ): Promise<ResponseWithMessage<Project>> {
    const project = await this.projectRepo
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.team', 'team')
      .leftJoinAndSelect('team.users', 'user')
      .where('project.id = :id', { id })
      .andWhere('user.id = :userId', { userId })
      .getOne();

    if (!project) {
      throw new HttpException(
        'Project not found or user is not part of the project',
        404,
      );
    }

    const updatedProject = this.projectRepo.merge(project, project);
    const savedProject = await this.projectRepo.save(updatedProject);

    return {
      message: 'Project updated successfully',
      data: savedProject,
    };
  }

  async leaveProject(
    userId: number,
    id: number,
  ): Promise<ResponseWithMessage<void>> {
    const projectToLeave = this.projectRepo
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.team', 'team')
      .leftJoinAndSelect('team.users', 'user')
      .where('project.id = :id', { id })
      .andWhere('user.id = :userId', { userId })
      .getOne();
    if (!projectToLeave) {
      throw new HttpException(
        'Project not found or user is not part of the project',
        404,
      );
    }
    try {
      await this.projectRepo
        .createQueryBuilder()
        .relation('project.users')
        .of(id)
        .remove(userId);
      return {
        message: 'User removed from project successfully',
      };
    } catch (error) {
      throw new HttpException('Error removing user from project', 500);
    }
  }

  getProjectUsers() {
    return 'Get project users';
  }

  async addUserToProject(
    userId: number,
    projectId_: number,
  ): Promise<ResponseWithMessage<Project>> {
    const project = await this.projectRepo.findOne({
      where: { id: projectId_ },
    });
    if (!project) {
      throw new HttpException('Project not found', 404);
    }
    const user = await this.teamRepo.findOne({ where: { id: userId } });
    if (!user) {
      throw new HttpException('User not found', 404);
    }
    try {
      await this.projectRepo
        .createQueryBuilder()
        .relation('project.users')
        .of(projectId_)
        .add(userId);
      return {
        message: 'User added to project successfully',
      };
    } catch (error) {
      throw new HttpException('Error adding user to project', 500);
    }
  }

  async deleteProject(
    userId: number,
    projectId: number,
  ): Promise<ResponseWithMessage<Project>> {
    const projectToDelete = await this.projectRepo
      .createQueryBuilder('project')
      .leftJoinAndSelect('project.team', 'team')
      .leftJoinAndSelect('team.users', 'user')
      .where('project.id = :id', { id: projectId })
      .andWhere('user.id = :userId', { userId })
      .getOne();

    if (!projectToDelete) {
      throw new HttpException(
        'Project not found or user is not part of the project',
        404,
      );
    }

    try {
      await this.projectRepo.delete(projectId);
      return {
        message: 'Project deleted successfully',
      };
    } catch (error) {
      throw new HttpException('Error deleting project', 500);
    }
  }
}
