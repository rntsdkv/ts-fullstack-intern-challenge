import { Injectable } from '@nestjs/common';
import { User } from "./user.entity";
import { AppDataSource } from "../data-source";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findUserByLogin(login: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: {
        login: login,
      },
    });
  }
}
