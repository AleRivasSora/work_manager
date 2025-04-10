import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTeamDto {
  @ApiProperty({
    description: 'The name of the team',
    example: 'Development Team',
    minLength: 2,
    maxLength: 20,
  })
  @IsNotEmpty({ message: 'The team name is required.' })
  @IsString({ message: 'The team name must be a string.' })
  @MinLength(2, {
    message: 'The team name must be at least 2 characters long.',
  })
  @MaxLength(20, { message: 'The team name cannot exceed 20 characters.' })
  name: string;

  @ApiProperty({
    description: 'A brief description of the team',
    example: 'This team handles all development tasks.',
    minLength: 2,
    maxLength: 100,
  })
  @IsNotEmpty({ message: 'The team description is required.' })
  @IsString({ message: 'The team description must be a string.' })
  @MinLength(2, {
    message: 'The team description must be at least 2 characters long.',
  })
  @MaxLength(100, {
    message: 'The team description cannot exceed 100 characters.',
  })
  description: string;
}
