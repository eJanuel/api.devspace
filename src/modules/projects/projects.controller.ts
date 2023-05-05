import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, ValidationPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../users/entities/user.entity';
import { Project } from './entities/project.entity';
import { ProjectSettingsService } from './project-settings.service';
import { ProjectUsersService } from './project-users.service';
import { UsersService } from '../users/users.service';
import { ProjectInvitationService } from './project-invitation.service';
import { TemporaryUsersService } from '../users/temporary-users.service';
import { ProjectSettings } from './entities/project-settings.entity';
import { CreateProjectFullReqDto } from './dto/create-project.req.dto';
import { CreateProjectDto } from './dto/create-project.dto';
import { CreateProjectSettingsDto } from './dto/create-project-settings.dto';
import { CreateProjectInvitationDto } from './dto/create-project-invitation.dto';
import { TemporaryUser } from '../users/entities/temporary-user.entity';
import { ProjectInvitations } from './entities/project-invitations.entity';

@Controller('projects')
export class ProjectsController {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly projectSettingsService: ProjectSettingsService,
    private readonly projectUsersService: ProjectUsersService,
    private readonly projectInvitationService: ProjectInvitationService,
    private readonly userService: UsersService,
    private readonly temporaryUsersService: TemporaryUsersService,
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createProject(@Request() req, @Body(new ValidationPipe()) body: CreateProjectFullReqDto) {
    const projectDto: CreateProjectDto = body.infos;
    const sender = req.user;

    const project: Project = await this.projectsService.create(projectDto);
    const settingsDto: CreateProjectSettingsDto = { ...body.settings, project };

    const settings: ProjectSettings = await this.projectSettingsService.create(settingsDto);

    // Associate the project with the creator user
    await this.projectUsersService.addUserToProject(sender, project, 3); // Creator has the highest permission level

    // // Handle user invitations
    if (body.invitations.length > 0) {
      for (const invitation of body.invitations) {
        if (sender.email !== invitation.email) {

          let receiver: TemporaryUser | User = await this.userService.findByEmail(invitation.email);
          let key = "receiver";

          if (!receiver) { // If email isn't registered as a User
            key = "temporaryReceiver";
            receiver = await this.temporaryUsersService.findByEmail(invitation.email);
            if (!receiver) { // If email isn't registered as a TemporaryUser then we create one
              receiver = await this.temporaryUsersService.create(invitation.email);
            }
          }

          const invitationDto: CreateProjectInvitationDto = { project, sender, [key]: receiver, permLevel: invitation.permLevel, isReceiverTemporary: receiver instanceof TemporaryUser }

          await this.projectInvitationService.create(invitationDto);
        }
      }
    }

    return project;
  }



  // async respondToProjectInvitation(invitationId: number, accepted: boolean, user: User): Promise<ProjectUsers> {
  //   const invitation = await this.projectInvitationService.accept(invitationId);

  //   if (accepted) {
  //     const project = await this.projectsService.findOne(invitation.project.id);
  //     await this.projectUsersService.addUserToProject(user, project, invitation.permLevel);
  //   }

  //   return invitation;
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAllByUser(@Request() req) {
    const user: User = req.user;
    return this.projectsService.findAllProjectsByUser(user);
  }
}
