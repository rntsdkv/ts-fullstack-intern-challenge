import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LikesModule } from './likes/likes.module';

@Module({
  imports: [LikesModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
