import { Injectable } from '@nestjs/common';
import { User } from '../auth/user.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { ArticleEntity } from './article.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleRepository } from './article.repository';
import { ArticleResponse } from './article.response';
import { ArticlesResponse } from './articles.response';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleRepository)
    private articleRepository: ArticleRepository,
  ) {}

  async getAllArticles(user: User, query: any): Promise<ArticlesResponse> {
    return this.articleRepository.getAllArticles(user, query);
  }

  async findBySlug(slug: string): Promise<ArticleResponse> {
    const article = await this.articleRepository.findBySlug(slug);
    return this.buildArticleResponse(article);
  }

  async createArticle(
    user: User,
    createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponse> {
    const article = await this.articleRepository.createArticle(
      user,
      createArticleDto,
    );
    return this.buildArticleResponse(article);
  }

  async updateArticle(
    user: User,
    slug: string,
    updateArticleDto: CreateArticleDto,
  ): Promise<ArticleResponse> {
    const article = await this.articleRepository.updateArticle(
      user,
      slug,
      updateArticleDto,
    );
    return this.buildArticleResponse(article);
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponse {
    return { article };
  }
}
