import { UUID } from 'crypto';
import { Repository } from 'typeorm';

import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { PaginationQueryDto } from './dto/paginationQuery.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Tasks } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Tasks) private readonly repo: Repository<Tasks>,
  ) {}
  async create(taskData: TaskDto): Promise<any> {
    try {
      const taskQuery = await this.repo.create(taskData);
      const resData = await this.repo.save(taskQuery);
      return resData;
    } catch (error) {
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async getAll(paginationQuery: PaginationQueryDto): Promise<any> {
    const { limit, offset } = paginationQuery;
    const taskQuery = await this.repo.find({
      skip: offset,
      take: limit,
    });

    if (taskQuery.length === 0) {
      throw new NotFoundException(`No task data`);
    }
    return taskQuery;
  }

  async getById(id: UUID): Promise<any> {
    const task = await this.repo.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return task;
  }

  async update(id: UUID, updateTaskDto: UpdateTaskDto): Promise<any> {
    const task = await this.repo.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`User of ${id} not found`);
    }

    Object.assign(task, updateTaskDto);

    return this.repo.save(task);
  }

  async delete(id: UUID): Promise<any> {
    await this.repo.delete(id);
  }
}
