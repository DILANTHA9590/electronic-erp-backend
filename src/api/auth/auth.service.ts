import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';


import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { AuthDto } from './dto/login-dto';
import { USER_STATUS } from '../user/entities/user-status.enum';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { accessToken, TokenPayload } from './interfaces/auth.interface';
import { Res } from '@nestjs/common';
import { LoginResponseDto } from './dto/login-repose-dto';
import { ApiResponseDto } from 'src/common/dto/api-respose-dto';
import { CreateUserDto } from '../user/dto/create-user.dto';


@Injectable()
export class AuthService {
   constructor(
        @InjectRepository
        (User) private readonly userRepository: Repository<User>,
        private configService: ConfigService,
        private  jwtService:JwtService,

    
      ){}


 async loginUser(authDto: AuthDto):Promise<ApiResponseDto<LoginResponseDto>> {

  const {login,password} =  authDto

  const existingUser = await this.userRepository.findOne({
    where:[
      {email:login},
      {userName:login},
    ]
  })

  if(!existingUser)  throw new NotFoundException("Inavlid username or email")
  
//   if (!existingUser.isVerified) {
//   throw new ForbiddenException('Please verify your email first');
// }

 if (existingUser.userStatus === USER_STATUS.BLOCKED) {
  throw new ForbiddenException('Your account has been blocked. Contact support.');
}

const customPassword =  password + this.configService.getOrThrow<string>('PASSWORD_PEPPER')

const checkPassowrd = await argon2.verify(existingUser.password, customPassword)

if(!checkPassowrd){
  throw new NotFoundException("Invalid password")
}
 const {id ,firstName,lastName,email,tokenVersion,userStatus} = existingUser

 const {refreshToken,accessToken} = this.genarateTokens({id ,firstName,lastName,email,tokenVersion,userStatus})

 
console.log("refresh token",refreshToken)
console.log("-------------------------------------------------------------------------------------------")
console.log("-------------------------------------------------------------------------------------------")
console.log("accesstoken",accessToken)

 return {
    success: true,
    message: "Login successful",
    data:{
      accessToken,
      refreshToken,
    }
 
  };




  }

  //genarate access token  and refsh token
private genarateTokens(existingUser:TokenPayload){
const {id ,firstName,lastName,email,tokenVersion,userStatus} = existingUser

const accessToken  = this.jwtService.sign({
  sub:id,
  firstName,
  lastName,
  email,
  tokenVersion,
  userStatus
},
{
    expiresIn: '7d', 
  },

)

const refreshToken = this.jwtService.sign(
  { sub: id, tokenVersion },
  {
    expiresIn: '7d', 
  },
);

return {accessToken ,refreshToken}
  }


async setAccessToken(refreshToken:string):Promise<ApiResponseDto<{ accessToken: string }>>{

  if(!refreshToken) throw new UnauthorizedException()

  const verifyToken =  await  this.jwtService.verifyAsync(refreshToken,{
    secret:this.configService.getOrThrow<string>('JWT_SECRET')
  })


  const  existingUser= await this.userRepository.findOne({
    where :{
      id:verifyToken.sub
    }
  })
  if(!existingUser) throw new UnauthorizedException("User not found")

  if (existingUser.userStatus === USER_STATUS.BLOCKED) {
  throw new ForbiddenException('Your account has been blocked. Contact support.');
}

  if(existingUser.tokenVersion != verifyToken.tokenVersion)  {
    throw new UnauthorizedException("Token Version Not Same")
  }


  const {id,firstName,lastName,tokenVersion,userStatus ,email}=existingUser

  const userData:accessToken={
    sub:id,
    firstName,
    lastName,
    tokenVersion,
    email,
    userStatus    
  }
  
  const accessToken:string  = this.jwtService.sign( userData,
 {
    expiresIn: '7d', 
  },

)
 return {
    success: true,
    message: "access token genarate successfully",
    data:{
      accessToken,
  
    }
 }



}
}
