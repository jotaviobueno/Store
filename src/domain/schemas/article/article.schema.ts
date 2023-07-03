import { Article } from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ArticleSchema implements Article {
  @Field()
  id: string;

  @Field()
  title: string;

  @Field()
  body: string;

  @Field(() => [String])
  imagesUrl: string[];

  @Field(() => Boolean)
  published: boolean;

  userId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  deletedAt: Date;
}
