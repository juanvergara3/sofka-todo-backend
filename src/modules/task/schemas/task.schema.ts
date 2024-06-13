import { Schema } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class Task {

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    completed: boolean;

    @Prop()
    dueDate: string;

    @Prop()
    listId: string;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
