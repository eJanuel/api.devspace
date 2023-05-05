import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne,
    Column,
  } from 'typeorm';
  import { User } from 'src/modules/users/entities/user.entity';
  import { Project } from './project.entity';
  
  @Entity('project_users')
  export class ProjectUsers {
    @PrimaryGeneratedColumn()
    id: number;
  
    @ManyToOne(() => Project, (project) => project.projectUsers, {
      onDelete: 'CASCADE',
    })
    project: Project;
  
    @ManyToOne(() => User, (user) => user.projectUsers, {
      onDelete: 'CASCADE',
    })
    user: User;
  
    @Column({ type: 'int', default: 0 })
    permLevel: number;
  }
  