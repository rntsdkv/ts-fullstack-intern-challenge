import { Controller, Delete, Get, Param, Post } from '@nestjs/common';

@Controller('likes')
export class LikesController {
  @Get()
  getLikes() {}

  @Post()
  setLike() {}

  @Delete(':id')
  deleteLike(@Param('id') cat_id: number) {}
}
