import { EntityRepository, getRepository, Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { User } from '../auth/user.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import slugify from 'slugify';
import { NotFoundException } from '@nestjs/common';
import { ArticlesResponse } from './articles.response';

@EntityRepository(ArticleEntity)
export class ArticleRepository extends Repository<ArticleEntity> {
  async getAllArticles(user: User, query: any): Promise<ArticlesResponse> {
    const queryBuilder = getRepository(ArticleEntity)
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.author', 'author');

    queryBuilder.orderBy('articles.createdAt', 'DESC');

    if (query.author) {
      queryBuilder.andWhere('articles.authorId = :id', { authorId: user.id });
    }

    if (query.tag) {
      queryBuilder.andWhere('articles.tagList LIKE :tag', {
        tag: `%${query.tag}%`,
      });
    }

    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const articles = await queryBuilder.getMany();
    const articlesCount = await queryBuilder.getCount();

    return { articles, articlesCount };
  }

  async findBySlug(slug: string) {
    return this.findOne({ slug });
  }

  async createArticle(
    user: User,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);

    if (!article.tagList) {
      article.tagList = [];
    }

    article.slug = this.getSlug(createArticleDto.title);

    article.author = user;

    await article.save();

    return article;
  }

  async updateArticle(
    user: User,
    slug: string,
    updateArticleDto: CreateArticleDto,
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);
    if (!article) {
      throw new NotFoundException('ARTICLE NOT FOUND');
    }

    Object.assign(article, updateArticleDto);

    return await this.save(article);
  }

  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
