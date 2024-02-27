import { UUID } from 'crypto';
import { QueryFailedError, Repository } from 'typeorm';

import {
    HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginationQueryDto } from './dto/paginationQuery.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/users.dto';
import { Users } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private readonly repo: Repository<Users>,
  ) {}

  async create(userData: UserDto): Promise<any> {
    try {
      const userQuery = await this.repo.create(userData);
      const resData = await this.repo.save(userQuery);
      return resData;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.message.includes('unique constraint')
      ) {
        throw new HttpException('User already exist', HttpStatus.CONFLICT);
      } else {
        throw new HttpException(
          'Internal Server Error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
  async getAll(paginationQuery: PaginationQueryDto): Promise<any> {
    const { limit, offset } = paginationQuery;
    const userQuery = await this.repo.find({
      skip: offset,
      take: limit,
    });

    if (userQuery.length === 0) {
      throw new NotFoundException(`No user data`);
    }
    return userQuery;
  }

  async getById(id: UUID): Promise<any> {
    const user = await this.repo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  async update(id: UUID, updateUserDto: UpdateUserDto): Promise<any> {
    const user = await this.repo.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User of ${id} not found`);
    }

    Object.assign(user, updateUserDto);

    return this.repo.save(user);
  }

  async delete(id: UUID): Promise<any> {
    await this.repo.delete(id);
  }
}
