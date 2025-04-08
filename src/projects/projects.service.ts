import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  getAllProjects() {
    return 'All projects';
  }

  getProjectById() {
    return 'Project by id';
  }

  createProject() {
    return 'Create project';
  }

  updateProject() {
    return 'Update project';
  }

  getProjectTeams() {
    return 'Get project teams';
  }
  getProjectTasks() {
    return 'Get project tasks';
  }
  addTeamToProject() {
    return 'Add team to project';
  }
  addTaskToProject() {
    return 'Add task to project';
  }
  removeTeamFromProject() {
    return 'Remove team from project';
  }
  leaveProject() {
    return 'Leave project';
  }
  getProjectUsers() {
    return 'Get project users';
  }
  addUserToProject() {
    return 'Add user to project';
  }
  removeUserFromProject() {
    return 'Remove user from project';
  }
  deleteProject() {
    return 'Delete project';
  }
}
