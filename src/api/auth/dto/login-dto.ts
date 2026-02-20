import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class AuthDto {

  @IsString()
  @IsNotEmpty()
  login: string; // email or username

  @IsString()
  @MinLength(6)
  @IsNotEmpty()
  password: string;

}