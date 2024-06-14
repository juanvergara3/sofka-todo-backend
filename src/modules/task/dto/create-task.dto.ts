import { IsBoolean, IsNotEmpty, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class CreateTaskDto {

    @IsNotEmpty()
    @IsString()
    readonly title: string;


    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsBoolean()
    readonly completed: boolean;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    readonly dueDate: Date;

    @IsNotEmpty()
    @IsString()
    readonly listId: string;
}
