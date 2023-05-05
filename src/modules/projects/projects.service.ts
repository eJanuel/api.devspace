import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './entities/project.entity';
import { ProjectSettings } from './entities/project-settings.entity';
import { User } from '../users/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
  ) { }

  async create(createProjectDto: CreateProjectDto): Promise<Project> {
    const project = this.projectsRepository.create(createProjectDto);
    return this.projectsRepository.save(project);
  }

  async findOne(id: number): Promise<Project> {
    return this.projectsRepository.findOne({ where: { id }, relations: ['settings'] });
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find({ relations: ['settings'] });
  }

  async findAllProjectsByUser(user: User): Promise<Project[]> {
    const query = `SELECT p.* FROM projects p JOIN project_users pu ON p.id = pu.projectId WHERE pu.userId = ?`;
    return this.projectsRepository.query(query, [user.id]);
  }

  async update(id: number, updateProjectDto: Partial<Project>): Promise<Project> {
    const project = await this.projectsRepository.findOne({ where: { id } });
    if (!project) {
      throw new Error('Project not found');
    }

    const updatedProject = Object.assign(project, updateProjectDto);
    return this.projectsRepository.save(updatedProject);
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
