import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  JoinColumn,
  BeforeInsert
} from 'typeorm';
import { User } from 'src/modules/users/entities/user.entity';
import { Project } from './project.entity';
import { TemporaryUser } from 'src/modules/users/entities/temporary-user.entity';

@Entity('project_invitations')
export class ProjectInvitations {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int', default: 0 })
  permLevel: number;

  @ManyToOne(() => Project, (project) => project.projectInvitations, {
    onDelete: 'CASCADE',
  })
  project: Project;

  @ManyToOne(() => User, (user) => user.sentProjectInvitations, {
    onDelete: 'CASCADE',
  })
  sender: User;

  @ManyToOne(() => User, (user) => user.receivedProjectInvitations, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'receiver_id' }) // specify the custom column name
  receiver: User;

  @ManyToOne(() => TemporaryUser, (tempUser) => tempUser.receivedProjectInvitations, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'temporary_receiver_id' }) // specify the custom column name
  temporaryReceiver: TemporaryUser;

  @Column()
  token: string;
}
