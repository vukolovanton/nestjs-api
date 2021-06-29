import { Controller, Get } from '@nestjs/common';
import { TagsService } from './tags.service';
import { Tags } from './tags.entity';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Get()
  async getAllTags(): Promise<Tags[]> {
    return this.tagsService.getAllTags();
  }
}
