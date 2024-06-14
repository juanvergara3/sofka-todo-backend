import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ListService } from './list.service';
import { List } from './schemas/list.schema';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';

@Controller('list')
export class ListController {

    constructor(private listService: ListService) { }

    @Get()
    async getAllLists(): Promise<List[]> {
        const lists = this.listService.getAll();
        return lists;
    }

    @Get(':id')
    async getListById(
        @Param('id')
        id: string
    ): Promise<List> {
        const lists = this.listService.getById(id);
        return lists;
    }

    @Post('new')
    async createList(
        @Body()
        list: CreateListDto
    ): Promise<List> {
        return this.listService.create(list);
    }

    @Put('update/:id')
    async updatelist(
        @Param('id')
        id: string,
        @Body()
        list: UpdateListDto
    ): Promise<List> {
        return this.listService.updateById(id, list);
    }

    @Delete('delete/:id')
    async deletelist(
        @Param('id')
        id: string,
    ): Promise<List> {
        return this.listService.deleteById(id);
    }
}
