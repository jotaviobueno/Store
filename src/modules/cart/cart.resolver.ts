import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { CartSchema, UserSchema } from '../../domain/schemas';
import {
  CreateCartInput,
  IdInput,
  PaginationOptionsInput,
} from '../../domain/dtos';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../access/guard/auth.guard';

@Resolver(() => CartSchema)
@UseGuards(AuthGuard)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => CartSchema)
  createCart(
    @Args('createCartInput') createCartInput: CreateCartInput,
    @Context('user') { id: userId }: UserSchema,
  ) {
    return this.cartService.create(userId, createCartInput);
  }

  @Query(() => [CartSchema], { name: 'cart' })
  findAll(
    @Context('user') { id: userId }: UserSchema,
    @Args('paginationOptions') paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.cartService.findAll(userId, paginationOptionsInput);
  }

  @Mutation(() => Boolean)
  removeCart(@Args('cartId') { id }: IdInput) {
    return this.cartService.remove(id);
  }
}
