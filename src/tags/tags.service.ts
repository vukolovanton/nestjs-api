import { Injectable } from '@nestjs/common';
import { Tags } from './tags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository)
    private readonly tagsRepository: TagsRepository,
  ) {}

  async getAllTags(): Promise<Tags[]> {
    return this.tagsRepository.getAllTags();
  }
}
