import { UUID } from 'crypto';
import { Serialize } from 'src/interceptors/resSerialize.interceptor';

import {
    Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query
} from '@nestjs/common';

import { PaginationQueryDto } from './dto/paginationQuery.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserResDto } from './dto/user-res.dto';
import { UserDto } from './dto/users.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Serialize(UserResDto)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() userDto: UserDto) {
    const resData = await this.usersService.create(userDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'User created',
      data: resData,
    };
  }

  @Serialize(UserResDto)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(@Query() paginationQuery: PaginationQueryDto) {
    const resData = await this.usersService.getAll(paginationQuery);

    return {
      statusCode: HttpStatus.OK,
      message: 'List users',
      data: resData,
    };
  }

  @Serialize(UserResDto)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getUser(@Param('id') id: UUID) {
    const resData = await this.usersService.getById(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'List users',
      data: resData,
    };
  }

  @Serialize(UserResDto)
  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async updateJob(@Param('id') id: UUID, @Body() updateUserDto: UpdateUserDto) {
    const resData = await this.usersService.update(id, updateUserDto);
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'User updated',
      data: resData,
    };
  }

  @Serialize(UpdateUserDto)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBookmark(@Param('id') id: UUID) {
    const resData = await this.usersService.delete(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Delete',
      data: resData,
    };
  }
}
