import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from '@prisma/client';

@ObjectType()
export class CategorySchema implements Category {
  @Field()
  id: string;

  @Field()
  name: string;

  userId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  deletedAt: Date;
}
