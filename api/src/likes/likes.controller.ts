import {Body, Controller, Delete, Get, Param, Post, UnauthorizedException, UseGuards} from '@nestjs/common';
import { LikesService } from './likes.service';
import {JwtAuthGuard} from "../auth/jwt-auth.guard";



@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getLikes() {
    try {
      return this.likesService.getAllLikes();
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new UnauthorizedException('Вы не авторизованы');
      }
      throw error;
    }
  }

  @Post()
  setLike(@Body() body: { cat_id: string }) {
    // return this.likesService.postLike(body.cat_id)
  }

  @Delete(':id')
  deleteLike(@Param('id') cat_id: number) {}
}
