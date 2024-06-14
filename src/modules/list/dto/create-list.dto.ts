import { IsNotEmpty, IsString } from "class-validator";

export class CreateListDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;

    @IsNotEmpty()
    @IsString()
    readonly color: string;
}
