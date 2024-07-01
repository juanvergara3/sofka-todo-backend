import { IsEmpty, IsOptional, IsString, MaxLength } from "class-validator";
import { User } from "src/modules/auth/schemas/user.schema";

export class UpdateListDto {

    @IsOptional()
    @IsString()
    @MaxLength(45)
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly color: string;

    @IsEmpty({ message: 'User is not allowed to be set manually' })
    readonly user: User;
}
