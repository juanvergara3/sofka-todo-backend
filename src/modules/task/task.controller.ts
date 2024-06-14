import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService) { }

    @Get()
    async getAllTasks(): Promise<Task[]> {
        const tasks = this.taskService.getAll();
        return tasks;
    }

    @Get(':id')
    async getTaskById(
        @Param('id')
        id: string
    ): Promise<Task> {
        const tasks = this.taskService.getById(id);
        return tasks;
    }

    @Post('new')
    async createTask(
        @Body()
        task: CreateTaskDto
    ): Promise<Task> {
        return this.taskService.create(task);
    }

    @Put('update/:id')
    async updateTask(
        @Param('id')
        id: string,
        @Body()
        task: UpdateTaskDto
    ): Promise<Task> {
        return this.taskService.updateById(id, task);
    }

    @Delete('delete/:id')
    async deleteTask(
        @Param('id')
        id: string,
    ): Promise<Task> {
        return this.taskService.deleteById(id);
    }
}
