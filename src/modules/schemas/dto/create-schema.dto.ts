import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Project } from 'src/modules/projects/entities/project.entity';

export class CreateSchemaDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  project: Project;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  content: string;
}
