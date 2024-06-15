import { Schema } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { User } from "src/modules/auth/schemas/user.schema";

@Schema({
    timestamps: true
})
export class List {

    @Prop({ unique: [true, 'List already exists'] })
    title: string;

    @Prop()
    color: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const ListSchema = SchemaFactory.createForClass(List);
