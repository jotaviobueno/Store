import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { OrderSchema, UserSchema } from 'src/domain/schemas';
import { UseGuards } from '@nestjs/common';
import { CreateOrderInput } from 'src/domain/dtos';
import { AuthGuard } from '../access/guard/auth.guard';

@Resolver(() => OrderSchema)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => OrderSchema)
  createOrder(
    @Context('user') { id: userId }: UserSchema,
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return this.orderService.create({ ...createOrderInput, userId });
  }
}
