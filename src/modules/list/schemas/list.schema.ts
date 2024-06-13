import { Schema } from "@nestjs/mongoose";
import { Prop } from "@nestjs/mongoose";
import { SchemaFactory } from "@nestjs/mongoose";

@Schema({
    timestamps: true
})
export class List {

    @Prop()
    title: string;

    @Prop()
    color: string;
}

export const ListSchema = SchemaFactory.createForClass(List);
