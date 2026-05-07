import {
  IsString,
  IsNotEmpty,
  IsEmail,
  MinLength,
  IsOptional,
  IsEnum,
  Matches
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { USER_STATUS } from '../entities/user-status.enum';

export class CreateUserDto {

  @ApiProperty({
    example: 'Kamal',
    description: 'User first name'
  })
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  firstName!: string;


  @ApiPropertyOptional({
    example: 'Perera',
    description: 'User last name (optional)'
  })
  @IsOptional()
  @IsString({ message: 'Last name must be a string' })
  lastName?: string;


  @ApiProperty({
    example: 'kamal_123',
    description: 'Unique username (letters, numbers, underscores only)'
  })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  userName!: string;


  @ApiProperty({
    example: 'kamal@gmail.com',
    description: 'Valid email address'
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;


  @ApiProperty({
    example: 'Test@1234',
    description:
      'Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
  })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).+$/,
    {
      message:
        'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character'
    }
  )
  password!: string;


  @ApiPropertyOptional({
    enum: USER_STATUS,
    example: USER_STATUS.PENDING,
    description: 'User status (pending, active, blocked)'
  })
  @IsOptional()
  @IsEnum(USER_STATUS, { message: 'Invalid user status value' })
  userStatus?: USER_STATUS;
}
