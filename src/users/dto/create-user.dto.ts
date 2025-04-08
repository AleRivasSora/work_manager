import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
  MaxLength,
  IsArray,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @MinLength(2, { message: 'The name must be at least 2 characters long.' })
  @MaxLength(20, { message: 'The name cannot exceed 20 characters.' })
  @IsNotEmpty({ message: 'The name is required.' })
  @IsString({ message: 'The name must be a string.' })
  name: string;

  @MinLength(2, {
    message: 'The last name must be at least 2 characters long.',
  })
  @MaxLength(20, { message: 'The last name cannot exceed 20 characters.' })
  @IsNotEmpty({ message: 'The last name is required.' })
  @IsString({ message: 'The last name must be a string.' })
  lastName: string;

  @IsNotEmpty({ message: 'The email is required.' })
  @IsEmail({}, { message: 'The email must be a valid email address.' })
  email: string;

  @MinLength(8, { message: 'The password must be at least 8 characters long.' })
  @MaxLength(20, { message: 'The password cannot exceed 20 characters.' })
  @IsNotEmpty({ message: 'The password is required.' })
  @IsString({ message: 'The password must be a string.' })
  @Matches(/[A-Z]/, {
    message: 'The password must contain at least one uppercase letter.',
  })
  @Matches(/[a-z]/, {
    message: 'The password must contain at least one lowercase letter.',
  })
  @Matches(/[0-9]/, {
    message: 'The password must contain at least one number.',
  })
  @Matches(/[\W_]/, {
    message: 'The password must contain at least one special character.',
  })
  password: string;

  @IsOptional()
  @IsArray({ message: 'The team must be an array.' })
  @IsString({ each: true, message: 'Each team member must be a string.' })
  team?: string[];

  @IsOptional()
  @IsArray({ message: 'The projects must be an array.' })
  @IsString({ each: true, message: 'Each project must be a string.' })
  projects?: string[];
}
