import { Field, ObjectType } from '@nestjs/graphql';
import { ArticleCategory } from '@prisma/client';

@ObjectType()
export class ArticleCategorySchema implements ArticleCategory {
  @Field()
  id: string;

  articleId: string;

  categoryId: string;
}
