import { IsBoolean, IsInt, IsNotEmpty, IsOptional, Max, Min } from "class-validator";
import { Project } from "../entities/project.entity";
import { User } from "src/modules/users/entities/user.entity";
import { TemporaryUser } from "src/modules/users/entities/temporary-user.entity";

export class CreateProjectInvitationDto {
    @IsNotEmpty()
    project: Project;

    @IsNotEmpty()
    sender: User;

    @IsOptional()
    receiver?: User;
    
    @IsOptional()
    temporaryReceiver?: TemporaryUser;

    @IsNotEmpty()
    @IsBoolean()
    isReceiverTemporary: boolean;

    @IsNotEmpty()
    @IsInt()
    @Min(0)
    @Max(3)
    permLevel: number;
}