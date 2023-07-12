import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Stock } from '@prisma/client';

@ObjectType()
export class StockSchema implements Stock {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field(() => Int)
  stock: number;

  productId: string;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
