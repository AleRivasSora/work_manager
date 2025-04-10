import {
  IsEmail,
  IsString,
  MinLength,
  IsNotEmpty,
  MaxLength,
} from 'class-validator';

export class loginUserDto {
  @IsNotEmpty({ message: 'The email is required.' })
  @IsEmail({}, { message: 'The email must be a valid email address.' })
  @IsString({ message: 'The email must be a string.' })
  @MinLength(5, { message: 'The email must be at least 5 characters long.' })
  @MaxLength(50, { message: 'The email cannot exceed 50 characters.' })
  email: string;

  @IsNotEmpty({ message: 'The password is required.' })
  @IsString({ message: 'The password must be a string.' })
  @MinLength(8, { message: 'The password must be at least 8 characters long.' })
  @MaxLength(20, { message: 'The password cannot exceed 20 characters.' })
  password: string;
}
