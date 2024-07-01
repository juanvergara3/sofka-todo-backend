import { IsBoolean, IsOptional, IsString, IsDate, IsEmpty, MaxLength } from "class-validator";
import { Type } from "class-transformer";
import { List } from "src/modules/list/schemas/list.schema";
import { User } from "src/modules/auth/schemas/user.schema";

export class UpdateTaskDto {

    @IsOptional()
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
    @Type(() => Date)
    @IsDate()
    readonly dueDate: Date;

    @IsOptional()
    @IsString()
    readonly list: List;

    @IsEmpty({ message: 'User is not allowed to be set manually' })
    readonly user: User;
}
