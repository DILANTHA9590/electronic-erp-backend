import {
  IsOptional,
  IsString,
  IsInt,
  Min,
  Max,
  IsEnum,
} from 'class-validator';

import { Type } from 'class-transformer';

import { ApiPropertyOptional } from '@nestjs/swagger';

import { USER_STATUS } from '../entities/user-status.enum';

export class SearchUsersDto {

  @ApiPropertyOptional({
    example: 'dilan',
    description: 'Search by first name, last name or email'
  })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({
    example: 1,
    description: 'Current page number',
    default: 1
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @ApiPropertyOptional({
    example: 10,
    description: 'Number of users per page',
    default: 10
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  @ApiPropertyOptional({
    enum: USER_STATUS,
    example: USER_STATUS.ACTIVE,
    description: 'Filter users by status'
  })
  @IsOptional()
  @IsEnum(USER_STATUS)
  status?: USER_STATUS;
}