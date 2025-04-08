import {
  IsEmail,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  Matches,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'The name must be a string.' })
  @MinLength(2, { message: 'The name must be at least 2 characters long.' })
  @MaxLength(20, { message: 'The name cannot exceed 20 characters.' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'The last name must be a string.' })
  @MinLength(2, {
    message: 'The last name must be at least 2 characters long.',
  })
  @MaxLength(20, { message: 'The last name cannot exceed 20 characters.' })
  lastName?: string;

  @IsOptional()
  @IsEmail({}, { message: 'The email must be a valid email address.' })
  email?: string;

  @IsOptional()
  @MinLength(8, { message: 'The password must be at least 6 characters long.' })
  @MaxLength(20, { message: 'The password cannot exceed 20 characters.' })
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
  password?: string;
}
