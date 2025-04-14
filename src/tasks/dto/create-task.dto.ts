import {
  IsNotEmpty,
  IsString,
  IsNumber,
  Min,
  MaxLength,
  IsIn,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'progress',
  COMPLETED = 'completed',
}

export class CreateTaskDto {
  @ApiProperty({
    description: 'The title of the task',
    example: 'Fix login bug',
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'The task title is required.' })
  @IsString({ message: 'The task title must be a string.' })
  @MaxLength(100, { message: 'The task title cannot exceed 100 characters.' })
  title: string;

  @ApiProperty({
    description: 'A brief description of the task',
    example: 'Fix the issue where users cannot log in with valid credentials.',
    maxLength: 500,
  })
  @IsNotEmpty({ message: 'The task description is required.' })
  @IsString({ message: 'The task description must be a string.' })
  @MaxLength(500, {
    message: 'The task description cannot exceed 500 characters.',
  })
  description: string;

  @ApiProperty({
    description: 'The status of the task',
    example: TaskStatus.IN_PROGRESS,
    enum: TaskStatus, // Documentar los valores permitidos en Swagger
  })
  @IsNotEmpty({ message: 'The task status is required.' })
  @IsString({ message: 'The task status must be a string.' })
  @IsIn(Object.values(TaskStatus), {
    message: `The task status must be one of the following: ${Object.values(
      TaskStatus,
    ).join(', ')}.`,
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'The ID of the project to which the task belongs',
    example: 1,
  })
  @IsNotEmpty({ message: 'The project ID is required.' })
  @IsNumber({}, { message: 'The project ID must be a number.' })
  @Min(1, { message: 'The project ID must be greater than 0.' })
  projectId: number;

  @ApiProperty({
    description: 'The ID of the user assigned to the task',
    example: 2,
  })
  @IsNotEmpty({ message: 'The user ID is required.' })
  @IsNumber({}, { message: 'The user ID must be a number.' })
  @Min(1, { message: 'The user ID must be greater than 0.' })
  userId: number;
}
