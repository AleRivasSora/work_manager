import {
  IsOptional,
  IsString,
  IsNumber,
  Min,
  MaxLength,
  IsNotEmpty,
  IsIn,
} from 'class-validator';
import { ApiPropertyOptional, ApiProperty } from '@nestjs/swagger';

export class UpdateTaskDto {
  @IsNotEmpty({ message: 'The task ID is required.' })
  @Min(1, { message: 'The task ID must be greater than 0.' })
  @ApiProperty({
    description: 'The unique identifier of the task',
    example: 1,
  })
  id: number;

  @ApiPropertyOptional({
    description: 'The title of the task',
    example: 'Update login bug fix',
    maxLength: 100,
  })
  @IsOptional()
  @IsString({ message: 'The task title must be a string.' })
  @MaxLength(100, { message: 'The task title cannot exceed 100 characters.' })
  title?: string;

  @ApiPropertyOptional({
    description: 'A brief description of the task',
    example:
      'Update the issue where users cannot log in with valid credentials.',
    maxLength: 500,
  })
  @IsOptional()
  @IsString({ message: 'The task description must be a string.' })
  @MaxLength(500, {
    message: 'The task description cannot exceed 500 characters.',
  })
  description?: string;

  @ApiPropertyOptional({
    description: 'The status of the task',
    example: 'Completed',
    enum: ['Pending', 'In Progress', 'Completed'],
  })
  @IsOptional()
  @IsString({ message: 'The task status must be a string.' })
  @IsIn(['Pending', 'In Progress', 'Completed'], {
    message:
      'The task status must be one of the following: Pending, In Progress, Completed.',
  })
  status?: string;

  @ApiPropertyOptional({
    description: 'The ID of the project to which the task belongs',
    example: 1,
  })
  @IsOptional()
  @IsNumber({}, { message: 'The project ID must be a number.' })
  @Min(1, { message: 'The project ID must be greater than 0.' })
  projectId?: number;

  @ApiPropertyOptional({
    description: 'The ID of the user assigned to the task',
    example: 2,
  })
  @IsOptional()
  @IsNumber({}, { message: 'The user ID must be a number.' })
  @Min(1, { message: 'The user ID must be greater than 0.' })
  userId?: number;
}
