import { IsEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/modules/auth/schemas/user.schema";

export class UpdateListDto {

    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly color: string;

    @IsEmpty({ message: 'User is not allowed to be set manually' })
    readonly user: User;
}
