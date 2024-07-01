import { IsBoolean, IsNotEmpty, IsString, IsDate, IsEmpty, IsOptional, MaxLength } from "class-validator";
import { Type } from "class-transformer";
import { List } from "src/modules/list/schemas/list.schema";
import { User } from "src/modules/auth/schemas/user.schema";

export class CreateTaskDto {

    @IsNotEmpty()
    @IsString()
    @MaxLength(60)
    readonly title: string;


    @IsOptional()
    @IsString()
    @MaxLength(300)
    readonly description: string;

    @IsOptional()
    @IsBoolean()
    readonly completed: boolean;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    readonly dueDate: Date;

    @IsNotEmpty({ message: 'Task is required to be associated with a list' })
    @IsString()
    readonly list: List;

    @IsEmpty({ message: 'User is not allowed to be set manually' })
    readonly user: User;
}
