import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { User as UserDecorator } from '../auth/custom-decorators/public.decorator';
import { User } from '../users/interfaces/users.interfaces';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Controller({})
export class TeamsController {
  constructor(private teamsService: TeamsService) {
    this.teamsService = teamsService;
  }
  @Get('/teams')
  getAllTeams(@UserDecorator() user: User) {
    return this.teamsService.getAllTeams(user);
  }

  @Get('/team/:id')
  getTeamById(@Param('id') id: number, @UserDecorator() user: User) {
    return this.teamsService.getTeamById(id, user.id);
  }

  @Post('/team')
  createTeam(@Body() team: CreateTeamDto) {
    return this.teamsService.createTeam(team);
  }

  @Post('/team/:id')
  updateTeam(
    @Body() team: UpdateTeamDto,
    @Param('id') idToUpdate: number,
    @UserDecorator() user: User,
  ) {
    return this.teamsService.updateTeam(team, idToUpdate, user.id);
  }

  @Post('/team/:id/users')
  addUserToTeam(@UserDecorator() user: User, @Param('id') teamId: number) {
    return this.teamsService.addUserToTeam(user.id, teamId);
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
