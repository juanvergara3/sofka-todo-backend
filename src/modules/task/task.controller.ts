import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('task')
export class TaskController {

    constructor(private taskService: TaskService) { }

    @Get()
    @UseGuards(AuthGuard())
    async getAllTasks(
        @Query('listId') listId: string,
        @Req() req
    ): Promise<Task[]> {
        const tasks = this.taskService.getAll(req.user._id, listId);
        return tasks;
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async getTaskById(
        @Param('id')
        id: string,
        @Req() req
    ): Promise<Task> {
        const tasks = this.taskService.getById(id, req.user._id);
        return tasks;
    }

    @Post('new')
    @UseGuards(AuthGuard())
    async createTask(
        @Body()
        task: CreateTaskDto,
        @Req() req
    ): Promise<Task> {
        return this.taskService.create(task, req.user._id);
    }

    @Put('update/:id')
    @UseGuards(AuthGuard())
    async updateTask(
        @Param('id')
        id: string,
        @Body()
        task: UpdateTaskDto,
        @Req() req
    ): Promise<Task> {
        return this.taskService.updateById(id, req.user._id, task);
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard())
    async deleteTask(
        @Param('id')
        id: string,
        @Req() req
    ): Promise<Task> {
        return this.taskService.deleteById(id, req.user._id);
    }

    @Delete('deleteByList/:id')
    @UseGuards(AuthGuard())
    async deleteTasksById(
        @Param('id')
        listId: string,
        @Req() req
    ): Promise<{ deletedCount?: number }> {
        return this.taskService.deleteByListId(listId, req.user._id);
    }
}
