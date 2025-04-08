import { Controller, Get, Post } from '@nestjs/common';
import { TeamsService } from './teams.service';

@Controller({})
export class TeamsController {
  constructor(private teamsService: TeamsService) {
    this.teamsService = teamsService;
  }
  @Get('/teams')
  getAllTeams() {
    return this.teamsService.getAllTeams();
  }

  @Get('/teams/:id')
  getTeamById() {
    return this.teamsService.getTeamById();
  }

  @Get('/team/:id/users')
  getTeamUsers() {
    return this.teamsService.getTeamUsers();
  }
  @Get('/team/:id/projects')
  getTeamProjects() {
    return this.teamsService.getTeamProjects();
  }

  @Post('/team')
  createTeam() {
    return this.teamsService.createTeam();
  }
  @Post('/team/:id')
  updateTeam() {
    return this.teamsService.updateTeam();
  }
  @Post('/team/:id/users')
  addUserToTeam() {
    return this.teamsService.addUserToTeam();
  }
  @Post('/team/:id/projects')
  addProjectToTeam() {
    return this.teamsService.addProjectToTeam();
  }
  @Post('/team/:id/users/:userId')
  removeUserFromTeam() {
    return this.teamsService.removeUserFromTeam();
  }
  @Post('/team/:id/projects/:projectId')
  removeProjectFromTeam() {
    return this.teamsService.removeProjectFromTeam();
  }
  @Post('/team/:id/leave')
  leaveTeam() {
    return this.teamsService.leaveTeam();
  }
}
