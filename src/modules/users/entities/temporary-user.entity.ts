import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany,
    AfterLoad,
    CreateDateColumn,
  } from 'typeorm';
  import { ProjectInvitations } from 'src/modules/projects/entities/project-invitations.entity';
  
  @Entity('temporary_users')
  export class TemporaryUser {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    email: string;
  
    @Column({ default: false })
    isDeleted: boolean;

    @CreateDateColumn()
    createdAt: Date;
  
    @OneToMany(() => ProjectInvitations, (invitation) => invitation.temporaryReceiver)
    receivedProjectInvitations: ProjectInvitations[];
  
    @AfterLoad()
    checkIsDeleted() {
      const now = new Date();
      const createdDate = new Date(this.createdAt);
      const diffInDays = Math.ceil((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
      if (diffInDays > 10) {
        this.isDeleted = true;
      }
    }
  }
  