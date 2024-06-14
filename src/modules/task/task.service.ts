import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from './schemas/task.schema';
import mongoose from 'mongoose';

@Injectable()
export class TaskService {
    constructor(
        @InjectModel(Task.name)
        private taskModel: mongoose.Model<Task>,
    ) { }

    async getAll(): Promise<Task[]> {
        const tasks = await this.taskModel.find();
        return tasks;
    }

    async getById(id: string): Promise<Task> {

        const isValid = mongoose.isValidObjectId(id);

        if (!isValid)
            throw new BadRequestException('Plese provide a valid id');

        const task = await this.taskModel.findById(id);

        if (!task)
            throw new NotFoundException('Task not found');

        return task;
    }

    async create(task: Task): Promise<Task> {
        const res = await this.taskModel.create(task);
        return res;
    }

    async updateById(id: string, task: Task): Promise<Task> {
        return await this.taskModel.findByIdAndUpdate(id, task, {
            new: true,
            runValidators: true,
        });
    }

    async deleteById(id: string): Promise<Task> {
        return await this.taskModel.findByIdAndDelete(id);
    }
}
