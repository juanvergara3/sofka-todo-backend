import { IsOptional, IsString } from "class-validator";

export class UpdateListDto {

    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly color: string;
}
