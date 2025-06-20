import { Injectable } from '@nestjs/common';
import { LoginDto } from '../auth/dto/login.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  create(loginDto: LoginDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(login: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ login });
  }
}
