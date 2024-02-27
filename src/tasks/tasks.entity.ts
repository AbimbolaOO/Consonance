import { IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TaskStatus } from './enum/enum';

@Entity()
export class Tasks {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsString()
  status: TaskStatus;

  @Column()
  @IsUUID()
  userId: UUID;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
