import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards, HttpCode, HttpStatus, Request,
} from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { AuthGuard } from '../auth/guards/auth.guard';

@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @UseGuards(AuthGuard)
  @HttpCode(201)
  @Get()
  findAll() {
    return this.likesService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() request, @Body() createLikeDto: CreateLikeDto) {
    return this.likesService.create(createLikeDto, request.user);
  }

  @UseGuards(AuthGuard)
  @HttpCode(200)
  @Delete(':id')
  async remove(@Request() request, @Param('id') id: string) {
    await this.likesService.remove(id, request.user);
    return {
      message: 'Successful operation',
      statusCode: HttpStatus.OK,
    };
  }
}
