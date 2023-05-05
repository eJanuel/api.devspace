import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_settings')
export class UserSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'private' })
  visibility: 'private' | 'public';

  @OneToOne(() => User, (user) => user.settings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;
}
