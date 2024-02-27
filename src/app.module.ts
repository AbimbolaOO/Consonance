import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService } from './app.service';
import { Tasks } from './tasks/tasks.entity';
import { TasksModule } from './tasks/tasks.module';
import { Users } from './users/users.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USERNAME'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DATABASE'),
        ssl: configService.get('POSTGRES_SSLMODE')
          ? {
              rejectUnauthorized: false,
            }
          : false,
        entities: [Users, Tasks],
        synchronize: true,
      }),
    }),
    UsersModule,
    TasksModule,
  ],
  providers: [AppService],
})
export class AppModule {}
