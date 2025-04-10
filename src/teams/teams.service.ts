import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Team as TeamRepository } from './teams.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './interfaces/teams.interfaces';
import { User } from '../users/interfaces/users.interfaces';
import { ResponseWithMessage } from '../users/interfaces/users.interfaces';
import { HttpException } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { User as UserRepository } from '../users/users.entity';

@Injectable()
export class TeamsService {
  constructor(
    @InjectRepository(TeamRepository)
    private TeamRepo: Repository<Team>,
    @InjectRepository(UserRepository)
    private UserRepository: Repository<User>,
  ) {}

  async getAllTeams(user: User): Promise<ResponseWithMessage<Team[]>> {
    const teams = await this.TeamRepo.find({
      where: { users: { id: user.id } },
      relations: ['users', 'projects'],
    });
    if (!teams || teams.length === 0) {
      throw new HttpException('User has not any team', 404);
    }

    const teamsCleaned = teams.map((team) => {
      const { users, ...teamWithoutUsers } = team;
      return teamWithoutUsers;
    });
    return {
      message: 'Teams retrieved successfully',
      data: teamsCleaned,
    };
  }

  async getTeamById(
    teamId: number,
    userId: number,
  ): Promise<ResponseWithMessage<Team>> {
    const team = await this.TeamRepo.createQueryBuilder('team')
      .select(['team.id', 'team.name', 'team.description'])
      .leftJoin('team.users', 'user')
      .addSelect(['user.id', 'user.name', 'user.lastName'])
      .leftJoinAndSelect('team.projects', 'project')
      .where('team.id = :teamId', { teamId })
      .andWhere('user.id = :userId', { userId })
      .getOne();

    if (!team) {
      throw new HttpException(
        'Team not found or user is not part of the team',
        404,
      );
    }

    return {
      message: 'Team retrieved successfully',
      data: team,
    };
  }

  createTeam(team: CreateTeamDto): ResponseWithMessage<Team> {
    const newTeam = this.TeamRepo.create(team);
    return {
      message: 'Team created successfully',
      data: newTeam,
    };
  }

  async updateTeam(
    team: UpdateTeamDto,
    idToUpdate: number,
    userId: number,
  ): Promise<ResponseWithMessage<Team>> {
    const teamToUpdate = await this.TeamRepo.createQueryBuilder('team')
      .leftJoin('team.users', 'user')
      .where('team.id = :idToUpdate', { idToUpdate })
      .andWhere('user.id = :userId', { userId })
      .getOne();

    if (!teamToUpdate) {
      throw new HttpException(
        'Team not found or user is not part of the team',
        404,
      );
    }
    const updatedTeam = this.TeamRepo.merge(teamToUpdate, team);
    const savedTeam = await this.TeamRepo.save(updatedTeam);

    return {
      message: 'Team updated successfully',
      data: savedTeam,
    };
  }
  getTeamProjects() {
    return 'Get team projects';
  }

  async addUserToTeam(
    userId: number,
    teamId: number,
  ): Promise<ResponseWithMessage<Team>> {
    const team = await this.TeamRepo.findOne({
      where: { id: teamId },
    });

    if (!team) {
      throw new HttpException('Team not found', 404);
    }

    const user = await this.UserRepository.findOne({
      where: { id: userId },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    const existingRelation = await this.TeamRepo.createQueryBuilder()
      .relation(TeamRepository, 'users')
      .of(teamId)
      .loadMany();

    const isUserInTeam = existingRelation.some(
      (existingUser) => existingUser.id === userId,
    );

    if (isUserInTeam) {
      throw new HttpException('User is already part of the team', 400);
    }

    await this.TeamRepo.createQueryBuilder()
      .relation(TeamRepository, 'users')
      .of(teamId)
      .add(userId);

    return {
      message: 'User added to the team successfully',
      data: team,
    };
  }

  addProjectToTeam() {
    return 'Add project to team';
  }
  removeUserFromTeam() {
    return 'Remove user from team';
  }
  removeProjectFromTeam() {
    return 'Remove project from team';
  }
  leaveTeam() {
    return 'Leave team';
  }
  getTeamUsers() {
    return 'Get team users';
  }
}
