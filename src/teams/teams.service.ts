import { Injectable } from '@nestjs/common';

@Injectable()
export class TeamsService {
  getAllTeams() {
    return 'All teams';
  }

  getTeamById() {
    return 'Team by id';
  }

  createTeam() {
    return 'Create team';
  }

  updateTeam() {
    return 'Update team';
  }

  getTeamMembers() {
    return 'Get team members';
  }
  getTeamProjects() {
    return 'Get team projects';
  }
  addUserToTeam() {
    return 'Add user to team';
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
