import { Project } from "src/modules/projects/entities/project.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { NoteSettings } from "./note-settings.entity";

@Entity('notes')
export class Note {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: "text" })
    content: string;

    @ManyToOne(() => Project, (project) => project.notes)
    project: Project;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => NoteSettings, (settings) => settings.note, {
        cascade: true,
    })
    settings: NoteSettings;
}
