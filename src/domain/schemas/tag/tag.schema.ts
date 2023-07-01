import { Field, ObjectType } from '@nestjs/graphql';
import { Tag } from '@prisma/client';

@ObjectType()
export class TagSchema implements Tag {
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
