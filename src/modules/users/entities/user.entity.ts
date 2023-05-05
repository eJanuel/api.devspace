import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    OneToOne,
} from 'typeorm';
import { UserSettings } from './user-settings.entity';
import { ProjectUsers } from 'src/modules/projects/entities/project-users.entity';
import { ProjectInvitations } from 'src/modules/projects/entities/project-invitations.entity';

const randomColor = Math.floor(Math.random() * 16777215).toString(16);

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    firstname?: string;

    @Column({ nullable: true })
    lastname?: string;

    @Column({ default: randomColor })
    avatar: string;

    @OneToOne(() => UserSettings, (settings) => settings.user, {
        cascade: true,
    })
    settings: UserSettings;

    @OneToMany(() => ProjectUsers, (projectUsers) => projectUsers.user)
    projectUsers: ProjectUsers[];

    @OneToMany(() => ProjectInvitations, (invitation) => invitation.sender)
    sentProjectInvitations: ProjectInvitations[];

    @OneToMany(() => ProjectInvitations, (invitation) => invitation.receiver)
    receivedProjectInvitations: ProjectInvitations[];
}
