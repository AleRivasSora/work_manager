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
  getAllTasks(@UserDecorator() user: any) {
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
  asignUserToTask() {
    return this.taskService.asignUserToTask();
  }
  @Delete('/task/:id/comments/:commentId')
  removeCommentFromTask() {
    return this.taskService.removeCommentFromTask();
  }
  @Delete('/task/:id/subtasks/:subtaskId')
  removeSubtaskFromTask() {
    return this.taskService.removeSubtaskFromTask();
  }
  @Delete('/task/:id/users/:userId')
  removeUserFromTask() {
    return this.taskService.removeUserFromTask();
  }
  @Get('/user/:id/tasks')
  getUserTasks() {
    return this.taskService.getUserTasks();
  }
  @Get('/project/:id/tasks')
  getProjectTasks() {
    return this.taskService.getProjectTasks();
  }
}
