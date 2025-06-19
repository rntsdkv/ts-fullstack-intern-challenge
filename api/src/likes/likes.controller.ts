import {Body, Controller, Delete, Get, Param, Post} from '@nestjs/common';
import { LikesService } from './likes.service';



@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Get()
  getLikes() {
    return this.likesService.getAllLikes();
  }

  @Post()
  setLike(@Body() body: { cat_id: string }) {
    // return this.likesService.postLike(body.cat_id)
  }

  @Delete(':id')
  deleteLike(@Param('id') cat_id: number) {}
}
