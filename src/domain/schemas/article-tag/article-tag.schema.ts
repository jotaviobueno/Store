import { Field, ObjectType } from '@nestjs/graphql';
import { ArticleTag } from '@prisma/client';

@ObjectType()
export class ArticleTagSchema implements ArticleTag {
  @Field()
  id: string;

  articleId: string;

  tagId: string;
}
