import { IsBoolean, IsOptional, IsString, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class UpdateTaskDto {

    @IsOptional()
    @IsString()
    readonly title: string;

    @IsOptional()
    @IsString()
    readonly description: string;

    @IsOptional()
    @IsBoolean()
    readonly completed: boolean;

    @IsOptional()
    @Type(() => Date)
    @IsDate()
    readonly dueDate: Date;

    @IsOptional()
    @IsString()
    readonly listId: string;
}
