import { Controller, Get, Post, Put, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';

@Controller({})
export class ProjectsController {
  constructor(private projectService: ProjectsService) {
    this.projectService = projectService;
  }
  @Get('/projects')
  getAllProjects() {
    return this.projectService.getAllProjects();
  }
  @Get('/projects/:id')
  getProjectById() {
    return this.projectService.getProjectById();
  }
  @Get('/projects/:id/teams')
  getProjectTeams() {
    return this.projectService.getProjectTeams();
  }
  @Get('/projects/:id/tasks')
  getProjectTasks() {
    return this.projectService.getProjectTasks();
  }
  @Get('/projects/:id/users')
  getProjectUsers() {
    return this.projectService.getProjectUsers();
  }
  @Post('/project')
  createProject() {
    return this.projectService.createProject();
  }
  @Put('/project/:id')
  updateProject() {
    return this.projectService.updateProject();
  }
  @Post('/project/:id/teams')
  addTeamToProject() {
    return this.projectService.addTeamToProject();
  }
  @Post('/project/:id/tasks')
  addTaskToProject() {
    return this.projectService.addTaskToProject();
  }
  @Post('/project/:id/users')
  addUserToProject() {
    return this.projectService.addUserToProject();
  }
  @Delete('/project/:id/teams/:teamId')
  removeTeamFromProject() {
    return this.projectService.removeTeamFromProject();
  }

  @Delete('/project/:id/users/:userId')
  removeUserFromProject() {
    return this.projectService.removeUserFromProject();
  }
  @Post('/project/:id/leave')
  leaveProject() {
    return this.projectService.leaveProject();
  }
  @Delete('/project/:id')
  deleteProject() {
    return this.projectService.deleteProject();
  }
}
