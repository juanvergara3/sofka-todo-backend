import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './schemas/list.schema';
import mongoose from 'mongoose';


@Injectable()
export class ListService {
    constructor(
        @InjectModel(List.name)
        private listModel: mongoose.Model<List>,
    ) { }

    async getAll(): Promise<List[]> {
        const lists = await this.listModel.find();
        return lists;
    }

    async getById(id: string): Promise<List> {
        const list = await this.listModel.findById(id);

        if (!list)
            throw new NotFoundException('List not found');

        return list;
    }

    async create(list: List): Promise<List> {
        const res = await this.listModel.create(list);
        return res;
    }

    async updateById(id: string, list: List): Promise<List> {
        return await this.listModel.findByIdAndUpdate(id, list, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<List> {
        return await this.listModel.findByIdAndDelete(id);
    }

}
