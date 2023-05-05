import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateCredentials(username: string, pass: string): Promise<Partial<User>> {
    const user = await this.usersService.findByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async validateUser(id: number, username: string): Promise<Partial<User>> {
    const user = await this.usersService.findByUsername(username);
    if (user) {
      if (user.id === id) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  // Generate jwt from payload
  async generateAccessToken(user: any) {
    const payload = { sub: user.id, user };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
