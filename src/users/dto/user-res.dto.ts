import { Expose } from 'class-transformer';
import { IsEmail, IsString, IsUUID } from 'class-validator';
import { UUID } from 'crypto';

export class UserResDto {
  @Expose()
  @IsUUID()
  id: UUID;

  @Expose()
  @IsString()
  name: string;

  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @IsString()
  updatedAt: string;

  @Expose()
  @IsString()
  createdAt: string;
}
