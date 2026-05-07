import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/login-dto';
import type { Response } from 'express';
import { Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiResponseDto } from 'src/common/dto/api-respose-dto';
import { LoginResponseDto } from './dto/login-repose-dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';


@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
            private configService: ConfigService,
  ) {}


  @Post('login')
  @HttpCode(HttpStatus.OK) // 200
  @ApiOperation({
    summary: 'Login user',
    description: 'Authenticate user and return access & refresh tokens'
  })

  @ApiBody({
    description: 'Login successful',
    type: AuthDto
  })

 async create(@Body() createAuthDto:AuthDto,
  @Res({ passthrough: true }) res: Response):Promise<ApiResponseDto<LoginResponseDto>> {
   const  response = await this.authService.loginUser(createAuthDto);
   
  const isProduction = this.configService.getOrThrow<string>("NODE_ENV") ==="production"
//🔹 Set refresh token in HTTP-only cookie
   res.cookie('refreshToken',response.data.refreshToken,{
    httpOnly:true,
    secure:isProduction,
    sameSite:isProduction ? 'strict' : 'lax',//🔴
    maxAge: 7 * 24 * 60 * 60 * 1000,  
    path:'api/v1/auth/refresh_token'
   })

   return {
    success: true,
    message: "Login successful",
    
    data:{
    accessToken:response.data?.accessToken,
    refreshToken:response.data?.refreshToken
    }
   
  }
  
}

@Post('refresh_token')
getRefreshTOken(@Req() req:any){

const  refreshToken:string = req.cookies.refreshToken
return this.authService.setAccessToken(refreshToken)




}



                                                                                                                                           @UseGuards(AuthGuard('jwt'))
  @Get("test")
  findAll(@Req() {user:{sub}}) {
    return sub
  }

}
