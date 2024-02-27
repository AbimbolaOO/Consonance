import { IsEmail, IsString } from 'class-validator';
import { UUID } from 'crypto';
import {
    Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn
} from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsEmail()
  @Unique(['email'])
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
