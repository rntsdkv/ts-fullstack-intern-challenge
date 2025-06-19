import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LikesModule } from './likes/likes.module';
import {
  db_host,
  db_port,
  db_username,
  db_password,
  db_database,
} from './config';
import {User} from "./users/user.entity";
import {Like} from "typeorm";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AuthModule} from "./auth/auth.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: db_host,
      port: db_port,
      username: db_username,
      password: db_password,
      database: db_database,
      entities: [User, Like],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Like]),
    AuthModule,
    LikesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
