import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import {InjectRepository} from "@nestjs/typeorm";
import { Repository } from 'typeorm';
import {Like} from "./entities/like.entity";
import {User} from "../users/entities/user.entity";
import {validate} from "class-validator";

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like)
    private likesRepository: Repository<Like>,
  ) {}

  async create(createLikeDto: CreateLikeDto, user: User) {
    const newLike = this.likesRepository.create({
      cat_id: createLikeDto.cat_id,
      cat_url: createLikeDto.cat_url,
      user_login: user.login,
    });

    const errors = await validate(newLike);

    if (errors.length > 0) {
      // throw new BadRequestException('Invalid input');
      throw new BadRequestException(errors);
    }

    if ((await this.findOne(newLike.user_login, newLike.cat_id)) !== null) {
      throw new ConflictException('Like already exists');
    }

    return this.likesRepository.save(newLike);
  }

  async findUserLikes(user: User) {
    const login = user.login;

    return this.likesRepository.find({
      where: { user_login: login },
    });
  }

  async findOne(login: string, cat_id: string): Promise<Like | null> {
    return this.likesRepository.findOneBy({
      cat_id: cat_id,
      user_login: login,
    });
  }

  async remove(cat_id: string, user: User) {
    const like = await this.findOne(user.login, cat_id);

    if (like !== null) {
      await this.likesRepository.delete(like.id);
      return true;
    }

    throw new NotFoundException('Like not found');
  }
}
