import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity('project_settings')
export class ProjectSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'private' })
  visibility: 'private' | 'public';

  @Column({ type: 'int', default: 0 })
  read_permLevel: number;

  @Column({ type: 'int', default: 0 })
  write_permLevel: number;

  @OneToOne(() => Project, (project) => project.settings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  project: Project;
}
