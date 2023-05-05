import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Note } from './note.entity';

@Entity('note_settings')
export class NoteSettings {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 'private' })
  visibility: 'private' | 'public';

  @Column({ type: 'int', default: 0 })
  read_permLevel: number;

  @Column({ type: 'int', default: 0 })
  write_permLevel: number;

  @OneToOne(() => Note, (note) => note.settings, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  note: Note;
}