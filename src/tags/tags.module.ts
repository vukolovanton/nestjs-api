import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsRepository } from './tags.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TagsRepository])],
  controllers: [TagsController],
  providers: [TagsService],
})
export class TagsModule {}
