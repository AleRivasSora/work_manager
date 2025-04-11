import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { User as UserDecorator } from '../auth/custom-decorators/public.decorator';
import { User } from '../users/interfaces/users.interfaces';
import { CreateProjectDto } from './dto/create-project.dto';

@Controller({})
export class ProjectsController {
  constructor(private projectService: ProjectsService) {
    this.projectService = projectService;
  }
  @Get('/projects')
  getAllProjects(@UserDecorator() user: User) {
    return this.projectService.getAllProjects(user);
  }
  @Get('/projects/:id')
  getProjectById(@Param('id') id: number, @UserDecorator() user: User) {
    return this.projectService.getProjectById(id, user.id);
  }

  @Get('/projects/:id/tasks')
  getProjectTasks() {
    return this.projectService.getProjectTasks();
  }

  @Post('/project')
  createProject(
    @Body() project: CreateProjectDto,
    @UserDecorator() user: User,
  ) {
    return this.projectService.createProject(project, user.id);
  }
  @Put('/project/:id')
  updateProject(@UserDecorator() user: User, @Param('id') id: number) {
    return this.projectService.updateProject(user.id, id);
  }

  @Post('/project/:id/users')
  addUserToProject() {
    return this.projectService.addUserToProject();
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
