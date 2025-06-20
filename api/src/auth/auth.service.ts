import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

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
    if (user?.password !== password_) {
      throw new UnauthorizedException();
    }

    const payload = { login: user.login };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
