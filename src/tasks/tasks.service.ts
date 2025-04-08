import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  getAllTasks() {
    return 'All tasks';
  }

  getTaskById() {
    return 'Task by id';
  }

  createTask() {
    return 'Create task';
  }

  updateTask() {
    return 'Update task';
  }
  getTaskSubtasks() {
    return 'Get task subtasks';
  }
  addCommentToTask() {
    return 'Add comment to task';
  }
  addSubtaskToTask() {
    return 'Add subtask to task';
  }
  asignUserToTask() {
    return 'Asign user to task';
  }
  removeCommentFromTask() {
    return 'Remove comment from task';
  }
  removeSubtaskFromTask() {
    return 'Remove subtask from task';
  }
  removeUserFromTask() {
    return 'Remove user from task';
  }

  getUserTasks() {
    return 'Get user tasks';
  }
  getProjectTasks() {
    return 'Get project tasks';
  }
}
