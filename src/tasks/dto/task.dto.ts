import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

import { TaskStatus } from '../enum/enum';

export class TaskDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  status: TaskStatus;

  @IsUUID()
  userId: UUID;
}
