import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from 'src/modules/projects/entities/project.entity';

@Entity("schemas")
export class Schema {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => Project, project => project.schemas)
  project: Project;
}