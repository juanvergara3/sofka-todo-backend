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

    async getAll(userId: string, listId: string): Promise<Task[]> {
        const tasks = await this.taskModel.find({ 'user': userId, 'list': listId });
        return tasks;
    }

    async getById(id: string, userId: string): Promise<Task> {
        const isValid = mongoose.isValidObjectId(id);

        if (!isValid)
            throw new BadRequestException('Plese provide a valid id');

        const task = await this.taskModel.findOne({ _id: id, 'user': userId });

        if (!task)
            throw new NotFoundException('Task not found or you are not allowed to view this task');

        return task;
    }

    async create(task: Task, userId: string): Promise<Task> {
        const data = Object.assign(task, { user: userId });

        const res = await this.taskModel.create(data);

        return res;
    }

    async updateById(id: string, userId: string, task: Task): Promise<Task> {
        const isValid = mongoose.isValidObjectId(id);

        if (!isValid)
            throw new BadRequestException('Plese provide a valid id');

        const updatedTask = await this.taskModel.findOneAndUpdate(
            { _id: id, 'user': userId },
            task,
            { new: true, runValidators: true }
        );

        if (!updatedTask)
            throw new NotFoundException('Task not found or you are not allowed to update this task');

        return updatedTask;
    }

    async deleteById(id: string, userId: string): Promise<Task> {
        const isValid = mongoose.isValidObjectId(id);

        if (!isValid)
            throw new BadRequestException('Plese provide a valid id');

        const deletedTask = await this.taskModel.findOneAndDelete(
            { _id: id, 'user': userId },
            { new: true, runValidators: true }
        );

        if (!deletedTask)
            throw new NotFoundException('Task not found or you are not allowed to delete this task');

        return deletedTask;
    }
}
