import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectUsers } from './entities/project-users.entity';
import { User } from '../users/entities/user.entity';
import { Project } from './entities/project.entity';

@Injectable()
export class ProjectUsersService {
  constructor(
    @InjectRepository(ProjectUsers)
    private readonly projectUsersRepository: Repository<ProjectUsers>,
  ) {}

  async addUserToProject(user: User, project: Project, permLevel: number): Promise<ProjectUsers> {
    const projectUser = new ProjectUsers();
    projectUser.user = user;
    projectUser.project = project;
    projectUser.permLevel = permLevel;

    return this.projectUsersRepository.save(projectUser);
  }

  async findByProjectId(projectId: number): Promise<ProjectUsers[]> {
    return this.projectUsersRepository.find({
      where: { project: { id: projectId } },
      relations: ['user', 'project'],
    });
  }

  async findByUserId(userId: number): Promise<ProjectUsers[]> {
    return this.projectUsersRepository.find({
      where: { user: { id: userId } },
      relations: ['user', 'project'],
    });
  }

  async updateProjectUser(userId: number, projectId: number, permLevel: number): Promise<ProjectUsers> {
    const projectUser = await this.projectUsersRepository.findOne({ where: { user: { id: userId }, project: { id: projectId } } });
    if (!projectUser) {
      throw new Error('User-project association not found');
    }

    projectUser.permLevel = permLevel;
    return this.projectUsersRepository.save(projectUser);
  }

  async removeUserFromProject(userId: number, projectId: number): Promise<void> {
    await this.projectUsersRepository.delete({ user: { id: userId }, project: { id: projectId } });
  }
}
