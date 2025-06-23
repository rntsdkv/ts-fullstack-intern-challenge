import {Controller, Post, Body, HttpCode, Get} from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDto } from '../auth/dto/login.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Post()
  async create(@Body() createUserDto: LoginDto) {
    return await this.usersService.create(createUserDto);
  }
}
