import { IsEnum, IsInt, IsNotEmpty, IsOptional, Max, Min } from "class-validator";
import { Project } from "../entities/project.entity";

export enum Visibility {
    PRIVATE = 'private',
    PUBLIC = 'public',
}

export class CreateProjectSettingsDto {
    @IsOptional()
    @IsEnum(Visibility)
    visibility?: Visibility;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(3)
    read_permLevel?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(3)
    write_permLevel?: number;

    @IsNotEmpty()
    project: Project;
}