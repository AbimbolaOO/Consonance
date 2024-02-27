import { Expose } from 'class-transformer';
import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

import { TaskStatus } from '../enum/enum';

export class TaskResDto {
  @Expose()
  @IsUUID()
  id: UUID;

  @Expose()
  @IsString()
  title: string;

  @Expose()
  @IsString()
  description: string;

  @Expose()
  @IsString()
  status: TaskStatus;

  @Expose()
  @IsUUID()
  userId: UUID;

  @Expose()
  @IsString()
  updatedAt: string;

  @Expose()
  @IsString()
  createdAt: string;
}
