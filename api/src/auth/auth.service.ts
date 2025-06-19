import { Injectable, UnauthorizedException} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    login: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.userService.findUserByLogin(login);
    if (!user || user.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { login: user.login };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
