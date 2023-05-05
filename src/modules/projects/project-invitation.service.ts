import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectInvitations } from './entities/project-invitations.entity';
import { User } from '../users/entities/user.entity';
import { Project } from './entities/project.entity';
import { ProjectUsersService } from './project-users.service';
import { ProjectUsers } from './entities/project-users.entity';
import * as nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { CreateProjectInvitationDto } from './dto/create-project-invitation.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as ejs from 'ejs';

@Injectable()
export class ProjectInvitationService {
    private emailTransporter;
    constructor(
        @InjectRepository(ProjectInvitations)
        private readonly projectInvitationsRepository: Repository<ProjectInvitations>,
        private readonly projectUsersService: ProjectUsersService,
        private readonly mailerService: MailerService
    ) { }

    async create(invitationDto: CreateProjectInvitationDto,): Promise<ProjectInvitations> {
        const invitation: ProjectInvitations = await this.projectInvitationsRepository.save({ ...invitationDto, token: uuidv4() });
        if (invitation !== null) {
            const acceptInvitationUrl = `${process.env.FRONTEND_BASE_URL}/accept-invitation?token=${invitation.token}`;

            console.log(invitation.temporaryReceiver);

            const email = invitation.temporaryReceiver !== null
                ? invitation?.temporaryReceiver?.email
                : invitation?.receiver?.email;

            const template = invitation.temporaryReceiver !== null
                ? await this.getTemporaryTemplate(invitation, acceptInvitationUrl)
                : await this.getRegisteredTemplate(invitation, acceptInvitationUrl);

            try {
                await this.sendInvitationEmail(email, template);
            } catch (error) {
                await this.projectInvitationsRepository.delete(invitation.id);
            }
        }

        return invitation;
    }

    private async getRegisteredTemplate(invitation: ProjectInvitations, acceptInvitationUrl: string): Promise<string> {
        const templatePath = __dirname + '/../../templates/registered-user.ejs';
        const username = invitation.receiver.username;
        return await ejs.renderFile(templatePath, { acceptInvitationUrl, username });
    }

    private async getTemporaryTemplate(invitation: ProjectInvitations, acceptInvitationUrl: string): Promise<string> {
        const templatePath = __dirname + '/../../templates/temporary-user.ejs'
        const temporaryUsername = invitation.temporaryReceiver.email.split('@')[0];

        return await ejs.renderFile(templatePath, { acceptInvitationUrl, temporaryUsername });
    }

    private async sendInvitationEmail(email: string, template: string): Promise<void> {

        try {
            await this.mailerService
                .sendMail({
                    to: email,
                    from: 'noreply@nestjs.com',
                    subject: 'Project Invitation',
                    html: template,
                })
            console.log('Mail sent');
        } catch (error) {
            console.log(error);
            throw new HttpException('Mail sending failed', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // async accept(invitationId: number): Promise<ProjectUsers> {
    //     const invitation = await this.projectInvitationsRepository.findOne({ where: { id: invitationId }, relations: ['receiver', 'project'] });
    //     if (!invitation) {
    //         throw new Error('Invitation not found');
    //     }

    //     const projectUser: ProjectUsers = await this.projectUsersService.addUserToProject(invitation.receiver, invitation.project, invitation.permLevel);
    //     if (projectUser) {
    //         await this.projectInvitationsRepository.delete(invitationId);
    //     }

    //     return projectUser;
    // }

    async findByProjectId(projectId: number): Promise<ProjectInvitations[]> {
        return this.projectInvitationsRepository.find({
            where: { project: { id: projectId } },
            relations: ['sender', 'receiver'],
        });
    }

    // async findByReceiverId(receiverId: number): Promise<ProjectInvitations[]> {
    //     return this.projectInvitationsRepository.find({
    //         where: { receiver: { id: receiverId } },
    //         relations: ['sender', 'receiver', 'project'],
    //     });
    // }
}
