import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(
    login: string,
    password_: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(login);

    if (user === null) {
      throw new BadRequestException('Неверный логин');
    }

    if (!(await argon2.verify(String(user.password), String(password_)))) {
      throw new UnauthorizedException('Неверный пароль');
    }

    const payload = { login: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
