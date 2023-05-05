import { Module } from '@nestjs/common';
import { NotesService } from './notes.service';
import { NotesController } from './notes.controller';
import { Note } from './entities/note.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NoteSettings } from './entities/note-settings.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Note, NoteSettings])],
  controllers: [NotesController],
  providers: [NotesService],
  exports: [NotesService, TypeOrmModule],

})

export class NotesModule { }
