import { Schema } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { List } from "src/modules/list/schemas/list.schema";
import { User } from "src/modules/auth/schemas/user.schema";

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
    dueDate: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'List' })
    list: List;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
