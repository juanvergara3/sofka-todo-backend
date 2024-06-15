import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ListService } from './list.service';
import { List } from './schemas/list.schema';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('list')
export class ListController {

    constructor(private listService: ListService) { }

    @Get()
    @UseGuards(AuthGuard())
    async getAllLists(
        @Req() req
    ): Promise<List[]> {
        const lists = this.listService.getAll(req.user._id);
        return lists;
    }

    @Get(':id')
    @UseGuards(AuthGuard())
    async getListById(
        @Param('id')
        id: string,
        @Req() req
    ): Promise<List> {
        const lists = this.listService.getById(id, req.user._id);
        return lists;
    }

    @Post('new')
    @UseGuards(AuthGuard())
    async createList(
        @Body()
        list: CreateListDto,
        @Req() req
    ): Promise<List> {
        return this.listService.create(list, req.user._id);
    }

    @Put('update/:id')
    @UseGuards(AuthGuard())
    async updatelist(
        @Param('id')
        id: string,
        @Body()
        list: UpdateListDto,
        @Req() req
    ): Promise<List> {
        return this.listService.updateById(id, req.user._id, list);
    }

    @Delete('delete/:id')
    @UseGuards(AuthGuard())
    async deletelist(
        @Param('id')
        id: string,
        @Req() req
    ): Promise<List> {
        return this.listService.deleteById(id, req.user._id);
    }
}
