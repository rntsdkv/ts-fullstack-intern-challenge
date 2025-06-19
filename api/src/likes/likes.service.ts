import { Injectable } from '@nestjs/common';
import { Like } from './like.entity';
import { AppDataSource } from '../data-source';

@Injectable()
export class LikesService {
  private likeRepository = AppDataSource.getRepository(Like);

  async getAllLikes(): Promise<Like[]> {
    return this.likeRepository.find();
  }

  async getLike(cat_id: string, user_login: string): Promise<Like | null> {
    return this.likeRepository.findOne({
      where: {
        cat_id: cat_id,
        user_login: user_login,
      },
    });
  }

  async postLike(cat_id: string, user_login: string): Promise<Like | null> {
    const like = await this.getLike(cat_id, user_login);

    if (!like) {
      const newLike = this.likeRepository.create({
        cat_id: cat_id,
        user_login: user_login,
      });
      return this.likeRepository.save(newLike);
    }

    return null;
  }

  async deleteLike(cat_id: string, user_login: string): Promise<boolean> {
    const like = await this.getLike(cat_id, user_login);
    if (like) {
      await this.likeRepository.delete(like);
      return true;
    }

    return false;
  }
}
