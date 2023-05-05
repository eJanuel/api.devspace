import { Controller, Request, Post, UseGuards, Body, ConflictException, BadRequestException } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService, private usersService: UsersService) { }

  // With Local Auth Guard decorator, we intercept userData in req and cycle them through our local-auth strategy
  // By doing so, @Post is only triggered if user has been validated by the strategy and will populate user datas
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.generateAccessToken(req.user);
  }

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    const errors = [];

    const mailExists = await this.usersService.findByEmail(createUserDto.email);
    if (mailExists) {
      errors.push("Mail address already in use");
    }

    const usernameExists = await this.usersService.findByUsername(createUserDto.username);
    if (usernameExists) {
      errors.push("Username already in use");
    }

    if (errors.length === 0) {
      let user: User = await this.usersService.create(createUserDto);
      return this.authService.generateAccessToken(user);
    }

    throw new ConflictException(errors);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async verifyToken() {
    return;
  }
}
