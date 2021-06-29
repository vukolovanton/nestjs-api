import { EntityRepository, Repository } from 'typeorm';
import { Tags } from './tags.entity';

@EntityRepository(Tags)
export class TagsRepository extends Repository<Tags> {
  async getAllTags() {
    return this.find();
  }
}
