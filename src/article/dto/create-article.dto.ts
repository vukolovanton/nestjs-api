import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly imageUrl: string;

  @IsNotEmpty()
  readonly body: string;

  readonly tagList?: string[];
}
