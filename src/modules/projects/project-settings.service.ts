import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectSettings } from './entities/project-settings.entity';
import { Project } from './entities/project.entity';
import { CreateProjectSettingsDto } from './dto/create-project-settings.dto';

@Injectable()
export class ProjectSettingsService {
  constructor(
    @InjectRepository(ProjectSettings)
    private readonly projectSettingsRepository: Repository<ProjectSettings>,
  ) { }

  async create(createProjectSettingsDto: CreateProjectSettingsDto): Promise<ProjectSettings> {
    const projectSettings = this.projectSettingsRepository.create(createProjectSettingsDto);
    return this.projectSettingsRepository.save(projectSettings);
  }

  async update(project: Project, updateSettingsDto: Partial<ProjectSettings>): Promise<ProjectSettings> {
    const settings = await this.projectSettingsRepository.findOne({ where: { project: { id: project.id } } });
    if (!settings) {
      throw new Error('Project settings not found');
    }

    const updatedSettings = Object.assign(settings, updateSettingsDto);
    return this.projectSettingsRepository.save(updatedSettings);
  }

  async findByProjectId(projectId: number): Promise<ProjectSettings> {
    return this.projectSettingsRepository.findOne({ where: { project: { id: projectId } } });
  }
}
