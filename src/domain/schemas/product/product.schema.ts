import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Product } from '@prisma/client';

@ObjectType()
export class ProductSchema implements Product {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field(() => [String], { nullable: true })
  imagesUrl: string[] | null;

  @Field(() => Float)
  price: number;

  priceId: string | null;

  @Field(() => Boolean)
  active: boolean;

  userId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  deletedAt: Date | null;
}
