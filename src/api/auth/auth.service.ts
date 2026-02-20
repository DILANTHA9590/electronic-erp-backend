import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';


import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/login-dto';
import { USER_STATUS } from '../user/entities/user-status.enum';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
   constructor(
        @InjectRepository
        (User) private readonly userRepository: Repository<User>,
        private configService: ConfigService,
        private  jwtService:JwtService,

    
      ){}


 async loginUser(authDto: AuthDto) {

  const {login,password} =  authDto

  const existingUser = await this.userRepository.findOne({
    where:[
      {email:login},
      {user_name:login},
    ]
  })

  if(!existingUser){
    throw new NotFoundException("Inavlid username or email")
  }

  if (!existingUser.isVerified) {
  throw new ForbiddenException('Please verify your email first');
}


 if (existingUser.user_status === USER_STATUS.BLOCKED) {
  throw new ForbiddenException('Your account has been blocked. Contact support.');
}

const customPassword =  password + this.configService.getOrThrow<string>('PASSWORD_PEPPER')

const checkPassowrd = argon2.verify(password,customPassword)

if(!checkPassowrd){
  throw new NotFoundException("Invalid password")
}


const {id ,first_name,last_name,email,token_version,user_status} = existingUser

const accessToken  = this.jwtService.sign({
  sub:id,
  first_name,
  last_name,email,
  token_version,user_status
})

 return {
    success: true,
    message: "Login successful",
    accessToken
  };






















  



  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }


  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
