import { Cart } from '@prisma/client';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CartSchema implements Cart {
  @Field()
  id: string;

  userId: string;

  productId: string;

  @Field(() => Int)
  quantity: number;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;

  deletedAt: Date | null;
}
