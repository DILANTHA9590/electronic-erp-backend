import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRandomValues } from 'crypto';
import * as argon2 from 'argon2';
import { ApiResponseDto } from 'src/common/dto/api-respose-dto';
import { SearchUsersDto } from './dto/search-users.dto';
import { UuidParamDto } from 'src/common/dto/uuid-param';
import { exit } from 'process';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository
      (User) private readonly userRepository: Repository<User>,
      private configService: ConfigService
    ){}

async create(createUserDto: CreateUserDto):Promise<ApiResponseDto<null>>{
  const { email, user_name, password } = createUserDto;

  // 🔎 Check existing user (single DB query)
  const existingUser = await this.userRepository.findOne({
    where: [
      { email },
      { user_name }
    ],
  });

  if (existingUser) {
    if (existingUser.email === email) {
      throw new ConflictException('Email already taken');
    }
    if (existingUser.user_name === user_name) {
      throw new ConflictException('Username already taken');
    }
  }

  // 🔐 Get Pepper from .env
  const pepper = this.configService.getOrThrow<string>('PASSWORD_PEPPER');

  // 🔒 Hash password using Argon2id
  const hashedPassword = await argon2.hash(password + pepper, {
    type: argon2.argon2id,
    memoryCost: 2 ** 16, // 64MB
    timeCost: 3,
    parallelism: 1,
  });

  // 👤 Create user
  const newUser = this.userRepository.create({
    ...createUserDto,
    password: hashedPassword,
    isVerified: false, // OTP verify karanawanam false
  });

  await this.userRepository.save(newUser);

  return {
    succes: true,
    message: 'User created successfully',
    data:null

  };
}


  private generateFiveDigitNumber(): number {
  return Math.floor(100 + Math.random() * 900);
}


getAllUsers(dto:SearchUsersDto) {

  const {limit,search,page} = dto

  }

async findOne({id}: UuidParamDto):Promise<ApiResponseDto<User>> {


  const existUser = await this.userRepository.findOne({
    where:{id}
  })

  if(!existUser) throw new NotFoundException("No UserFound")
   
  return{
    succes:true,
    message:"user data retrive succssfully",
    data:existUser
  }  







    
  }


  async findOne1(id: UuidParamDto) {
  const isExist = await this.userRepository.findOne({
    where: { id: id.id }
  });
}

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
