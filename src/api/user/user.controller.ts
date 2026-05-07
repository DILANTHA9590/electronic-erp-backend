import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpCode,
  Query,
} from '@nestjs/common';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UuidParamDto } from 'src/common/dto/uuid-param';
import { SearchUsersDto } from './dto/search-users.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new user',
    description: 'This endpoint is used to create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
  })
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
@Get('all')

  @ApiOperation({
  summary: 'Get all users',
  description: 'Fetch all users with pagination and search'
})

getAll(
  @Query() dto: SearchUsersDto
) {
  return this.userService.getAllUsers(dto);
}
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get user by ID',
    description: 'Retrieve a single user using UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'User UUID',
  })
  @ApiResponse({
    status: 200,
    description: 'User fetched successfully',
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
  })
  findOne(@Param('id') id: UuidParamDto) {
    return this.userService.findOne(id);
  }




  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Update user',
    description: 'Update existing user details',
  })
  @ApiParam({
    name: 'id',
    description: 'User UUID',
  })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
  })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete user',
    description: 'Delete user using UUID',
  })
  @ApiParam({
    name: 'id',
    description: 'User UUID',
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
  })
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }

}