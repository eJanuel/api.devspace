import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  // Will always cycle through 'validate' named function on init
  async validate(username: string, password: string): Promise<any> {
    const user: Partial<User> = await this.authService.validateCredentials(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
