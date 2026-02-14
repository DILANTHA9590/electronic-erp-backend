import { ConflictException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getRandomValues } from 'crypto';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
    constructor(
      @InjectRepository
      (User) private readonly userRepository: Repository<User>,
      private configService: ConfigService
    ){}

async create(createUserDto: CreateUserDto) {
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
    success: true,
    message: 'User created successfully',
  };
}




  private generateFiveDigitNumber(): number {
  return Math.floor(100 + Math.random() * 900);
}


  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
