import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class AuthDto {

  @ApiProperty({
    example: 'test@gmail.com',
    description: 'User email'
  })
  @IsEmail()
  login!: string;

  @ApiProperty({
    example: '12345678',
    description: 'User password'
  })
  @IsString()
  password!: string;
}