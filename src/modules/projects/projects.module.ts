import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { Project } from './entities/project.entity';
import { ProjectSettings } from './entities/project-settings.entity';
import { ProjectSettingsService } from './project-settings.service';
import { ProjectUsers } from './entities/project-users.entity';
import { ProjectUsersService } from './project-users.service';
import { ProjectInvitations } from './entities/project-invitations.entity';
import { ProjectInvitationService } from './project-invitation.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Project,
      ProjectSettings,
      ProjectUsers,
      ProjectInvitations,
    ]),
    UsersModule
  ],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    ProjectSettingsService,
    ProjectUsersService,
    ProjectInvitationService,
  ],
})
export class ProjectsModule {}
