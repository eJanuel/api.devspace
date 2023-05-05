import { IsEmail, IsEnum, IsInt, IsNotEmpty, IsOptional, Max, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Visibility } from './create-project-settings.dto';

class CreateProjectReqDto {
    @IsNotEmpty()
    name: string;

    @IsOptional()
    description: string;
}

class CreateProjectSettingsReqDto {
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
}

class CreateProjectInvitationReqDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(3)
    permLevel: number;
}

export class CreateProjectFullReqDto {
    @IsNotEmpty()
    @ValidateNested()
    @Type(() => CreateProjectReqDto)
    infos: CreateProjectReqDto;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateProjectInvitationReqDto)
    invitations?: CreateProjectInvitationReqDto[];

    @ValidateNested()
    @Type(() => CreateProjectSettingsReqDto)
    settings?: CreateProjectSettingsReqDto;
}