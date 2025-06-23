import {BadRequestException, ConflictException, Injectable} from '@nestjs/common';
import { LoginDto } from '../auth/dto/login.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import {validate} from "class-validator";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async create(loginDto: LoginDto) {
    if (!loginDto.login || !loginDto.password) {
      throw new BadRequestException('Invalid input');
    }

    if ((await this.findOne(loginDto.login)) !== null) {
      throw new ConflictException('Такой логин уже используется');
    }

    const newUser = this.usersRepository.create({
      login: loginDto.login,
      password: await argon2.hash(loginDto.password),
    });

    await this.usersRepository.save(newUser);

    const payload = { login: loginDto.login };

    return {
      message: 'User created successfully',
      statusCode: 200,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async findOne(login: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ login });
  }
}
