import { Module } from '@nestjs/common';
import { ListController } from './list.controller';
import { ListService } from './list.service';
import { ListSchema } from './schemas/list.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'List', schema: ListSchema }])
  ],
  controllers: [ListController],
  providers: [ListService]
})
export class ListModule { }
