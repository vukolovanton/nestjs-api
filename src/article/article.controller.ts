import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { GetUser } from '../auth/jwt/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { AuthGuard } from '@nestjs/passport';
import { ArticleResponse } from './article.response';
import { ArticlesResponse } from './articles.response';

@Controller('articles')
@UseGuards(AuthGuard())
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async getAllArticles(
    @GetUser() user: User,
    @Query() query: any,
  ): Promise<ArticlesResponse> {
    return this.articleService.getAllArticles(user, query);
  }

  @Get(':slug')
  async getSingleArticle(
    @Param('slug') slug: string,
  ): Promise<ArticleResponse> {
    return this.articleService.findBySlug(slug);
  }

  @Post()
  async create(
    @GetUser() user: User,
    @Body('article') createArticleDto: CreateArticleDto,
  ): Promise<ArticleResponse> {
    return this.articleService.createArticle(user, createArticleDto);
  }

  @Put(':slug')
  async updateArticle(
    @GetUser() user: User,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: CreateArticleDto,
  ): Promise<ArticleResponse> {
    return this.articleService.updateArticle(user, slug, updateArticleDto);
  }
}
