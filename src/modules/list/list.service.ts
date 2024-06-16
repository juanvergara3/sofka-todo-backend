import { BadRequestException, Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { List } from './schemas/list.schema';
import mongoose from 'mongoose';

@Injectable()
export class ListService {
    constructor(
        @InjectModel(List.name)
        private listModel: mongoose.Model<List>,
    ) { }

    async getAll(userId: string): Promise<List[]> {
        const lists = await this.listModel.find({ 'user': userId });
        return lists;
    }

    async getById(id: string, userId: string): Promise<List> {
        const isValid = mongoose.isValidObjectId(id);

        if (!isValid)
            throw new BadRequestException('Plese provide a valid id');

        const list = await this.listModel.findOne({ _id: id, 'user': userId });

        if (!list)
            throw new NotFoundException('List not found or you are not allowed to view this list');

        return list;
    }

    async create(list: List, userId: string): Promise<List> {
        const data = Object.assign(list, { user: userId });

        const res = new this.listModel(data);

        try {
            await res.save();
        } catch (error) {
            if (error.code === 11000 && error.keyPattern.title)
                throw new ConflictException('List already exists');

            throw error;
        }

        return res;
    }

    async updateById(id: string, userId: string, list: List): Promise<List> {
        const isValid = mongoose.isValidObjectId(id);

        if (!isValid)
            throw new BadRequestException('Plese provide a valid id');

        const updatedList = await this.listModel.findOneAndUpdate(
            { _id: id, 'user': userId },
            list,
            { new: true, runValidators: true }
        );

        if (!updatedList)
            throw new NotFoundException('List not found or you are not allowed to update this list');

        return updatedList;
    }

    async deleteById(id: string, userId: string): Promise<List> {
        const isValid = mongoose.isValidObjectId(id);

        if (!isValid)
            throw new BadRequestException('Plese provide a valid id');

        const deletedList = await this.listModel.findOneAndDelete(
            { _id: id, 'user': userId },
            { new: true, runValidators: true }
        );

        if (!deletedList)
            throw new NotFoundException('List not found or you are not allowed to delete this list');

        return deletedList;
    }
}
