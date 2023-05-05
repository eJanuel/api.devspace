import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, BadRequestException, ValidationPipe } from '@nestjs/common';
import { NotesService } from './notes.service';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Project } from '../projects/entities/project.entity';

@Controller('notes')
export class NotesController {
  constructor(
    private notesService: NotesService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body(new ValidationPipe()) createNoteDto: CreateNoteDto) {
    return this.notesService.create(createNoteDto);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get()
  // findAllByProject(@Request() req) {
  //   const project: Project = req.project;
  //   if (!project) {
  //     throw new BadRequestException("Project is invalid");
  //   }
  //   return this.notesService.findAllNested(project);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.notesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNoteDto: UpdateNoteDto) {
    return this.notesService.update(+id, updateNoteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.notesService.remove(+id);
  }
}
