import {
  IsOptional,
  IsString,
  IsInt,
  MinLength,
  MaxLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProjectDto {
  @ApiProperty({
    description: 'The Name of the project',
    example: 1,
  })
  @IsOptional()
  @IsString({ message: 'The project name must be a string.' })
  @MinLength(2, {
    message: 'The project name must be at least 2 characters long.',
  })
  @MaxLength(50, { message: 'The project name cannot exceed 50 characters.' })
  name?: string;
  @ApiProperty({
    description: 'The description of the project',
    example: 1,
  })
  @IsOptional()
  @IsString({ message: 'The project description must be a string.' })
  @MinLength(2, {
    message: 'The project description must be at least 2 characters long.',
  })
  @MaxLength(200, {
    message: 'The project description cannot exceed 200 characters.',
  })
  description?: string;
  @ApiProperty({
    description: 'The ID of the team to which the project belongs',
    example: 1,
  })
  @IsOptional()
  @IsInt({ message: 'The team ID must be an integer.' })
  teamId?: number;
}
