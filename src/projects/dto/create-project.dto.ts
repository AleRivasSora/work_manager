import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProjectDto {
  @ApiProperty({
    description: 'The ID of the team to which the project belongs',
    example: 1,
  })
  @IsNotEmpty({ message: 'The team ID is required.' })
  @IsString({ message: 'The team ID must be a string.' })
  @MinLength(1, { message: 'The team ID must be at least 1 character long.' })
  teamId: number;
  @ApiProperty({
    description: 'The name of the project',
    example: 'Project Alpha',
    minLength: 2,
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'The project name is required.' })
  @IsString({ message: 'The project name must be a string.' })
  @MinLength(2, {
    message: 'The project name must be at least 2 characters long.',
  })
  @MaxLength(50, { message: 'The project name cannot exceed 50 characters.' })
  name: string;

  @ApiProperty({
    description: 'A brief description of the project',
    example: 'This project is focused on developing a new feature.',
    minLength: 2,
    maxLength: 200,
  })
  @IsNotEmpty({ message: 'The project description is required.' })
  @IsString({ message: 'The project description must be a string.' })
  @MinLength(2, {
    message: 'The project description must be at least 2 characters long.',
  })
  @MaxLength(200, {
    message: 'The project description cannot exceed 200 characters.',
  })
  description: string;
}
