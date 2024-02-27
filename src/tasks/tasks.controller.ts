import { UUID } from 'crypto';
import { Serialize } from 'src/interceptors/resSerialize.interceptor';

import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { PaginationQueryDto } from './dto/paginationQuery.dto';
import { TaskResDto } from './dto/task-res.dto';
import { TaskDto } from './dto/task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Serialize(TaskResDto)
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTask(@Body() taskDto: TaskDto) {
    const resData = await this.tasksService.create(taskDto);
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Task created',
      data: resData,
    };
  }

  @Serialize(TaskResDto)
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllTasks(@Query() paginationQuery: PaginationQueryDto) {
    const resData = await this.tasksService.getAll(paginationQuery);

    return {
      statusCode: HttpStatus.OK,
      message: 'List tasks',
      data: resData,
    };
  }

  @Serialize(TaskResDto)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getTask(@Param('id') id: UUID) {
    const resData = await this.tasksService.getById(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'List tasks',
      data: resData,
    };
  }

  @Serialize(TaskResDto)
  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  async updateJob(@Param('id') id: UUID, @Body() updateTaskDto: UpdateTaskDto) {
    const resData = await this.tasksService.update(id, updateTaskDto);
    return {
      statusCode: HttpStatus.ACCEPTED,
      message: 'Task updated',
      data: resData,
    };
  }

  @Serialize(UpdateTaskDto)
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteBookmark(@Param('id') id: UUID) {
    const resData = await this.tasksService.delete(id);
    return {
      statusCode: HttpStatus.NO_CONTENT,
      message: 'Delete',
      data: resData,
    };
  }
}
