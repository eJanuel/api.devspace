import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, UpdateDateColumn } from 'typeorm';
import { ProjectSettings } from './project-settings.entity';
import { Schema } from 'src/modules/schemas/entities/schema.entity';
import { Note } from 'src/modules/notes/entities/note.entity';
import { ProjectUsers } from './project-users.entity';
import { ProjectInvitations } from './project-invitations.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => ProjectSettings, (settings) => settings.project, {
    cascade: true,
  })
  settings: ProjectSettings;

  @OneToMany(() => Note, note => note.project)
  notes: Note[];

  @OneToMany(() => Schema, schema => schema.project)
  schemas: Schema[];

  @OneToMany(() => ProjectUsers, (projectUsers) => projectUsers.project)
  projectUsers: ProjectUsers[];

  @OneToMany(() => ProjectInvitations, (invitation) => invitation.project)
  projectInvitations: ProjectInvitations[];
}
