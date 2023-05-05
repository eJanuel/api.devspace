import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { UserSettings } from './entities/user-settings.entity';
import { UserSettingsService } from './user-settings.service';
import { TemporaryUser } from './entities/temporary-user.entity';
import { TemporaryUsersService } from './temporary-users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserSettings, TemporaryUser]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserSettingsService, TemporaryUsersService],
  exports: [UsersService, TemporaryUsersService], // Export the UserService so that it can be used by other modules
})
export class UsersModule { }
