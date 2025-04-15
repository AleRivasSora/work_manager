import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { User as UserDecorator } from '../auth/custom-decorators/public.decorator';
import { User } from '../users/interfaces/users.interfaces';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
@Controller({})
export class TasksController {
  constructor(private taskService: TasksService) {
    this.taskService = taskService;
  }
  @Get('/tasks')
  getAllTasks(@UserDecorator() user: User) {
    return this.taskService.getAllTasks(user.id);
  }
  @Get('/tasks/:id')
  getTaskById(@UserDecorator() user: User, @Param('id') id: number) {
    return this.taskService.getTaskById(user.id, id);
  }
  @Post('/task')
  createTask(@Body() task: CreateTaskDto) {
    return this.taskService.createTask(task);
  }
  @Put('/task')
  updateTask(@Body() task: UpdateTaskDto) {
    return this.taskService.updateTask(task);
  }

  @Post('/task/:id/users')
  asignUserToTask(@UserDecorator() user: User, @Param('id') id: number) {
    return this.taskService.asignUserToTask(user.id, id);
  }

  @Delete('/task/:id/users/:userId')
  removeUserFromTask(
    @UserDecorator() user: User,
    @Param('id') id: number,
    @Param('userId') userToRemoveId: number,
  ) {
    return this.taskService.removeUserFromTask(user.id, id, userToRemoveId);
  }

  @Get('/project/:id/tasks')
  getProjectTasks(@Param('id') id: number, @UserDecorator() user: User) {
    return this.taskService.getProjectTasks(id, user.id);
  }
}
