import { IsEmpty, IsNotEmpty, IsString } from "class-validator";
import { User } from "src/modules/auth/schemas/user.schema";

export class CreateListDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly color: string;

    @IsEmpty({ message: 'User is not allowed to be set manually' })
    readonly user: User;
}
