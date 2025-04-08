import { Controller, Get, Post, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
@Controller({})
export class TasksController {
  constructor(private taskService: TasksService) {
    this.taskService = taskService;
  }
  @Get('/tasks')
  getAllTasks() {
    return this.taskService.getAllTasks();
  }
  @Get('/tasks/:id')
  getTaskById() {
    return this.taskService.getTaskById();
  }
  @Get('/tasks/:id/subtasks')
  getTaskSubtasks() {
    return this.taskService.getTaskSubtasks();
  }
  @Post('/task')
  createTask() {
    return this.taskService.createTask();
  }
  @Put('/task/:id')
  updateTask() {
    return this.taskService.updateTask();
  }
  @Post('/task/:id/comments')
  addCommentToTask() {
    return this.taskService.addCommentToTask();
  }
  @Post('/task/:id/subtasks')
  addSubtaskToTask() {
    return this.taskService.addSubtaskToTask();
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
