import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Order } from '@prisma/client';
import { ORDER_ENUM } from 'src/domain/enums';

@ObjectType()
export class OrderSchema implements Order {
  @Field()
  id: string;

  stripeId: string | null;

  userId: string;

  productsIds: string[];

  @Field(() => ORDER_ENUM, { nullable: true })
  status: string | null;

  @Field(() => Int, { nullable: true })
  totalPrice: number | null;

  @Field(() => Int, { nullable: true })
  quantity: number | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
