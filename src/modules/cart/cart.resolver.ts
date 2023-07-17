import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { CartSchema, UserSchema } from '../../domain/schemas';
import {
  CreateCartInput,
  IdInput,
  PaginationOptionsInput,
  UpdateCartInput,
} from '../../domain/dtos';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../access/guard/auth.guard';
import { RoleGuard } from '../role/guards/role.guard';
import { PERMISSION_ENUM } from 'src/domain/enums';
import { Permissions } from '../permission/decorator/permission.decorator';

@Resolver(() => CartSchema)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(PERMISSION_ENUM.CAN_CREATE_CART)
  @Mutation(() => CartSchema)
  createCart(
    @Args('createCartInput') createCartInput: CreateCartInput,
    @Context('user') { id: userId }: UserSchema,
  ) {
    return this.cartService.create(userId, createCartInput);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(
    PERMISSION_ENUM.CAN_READ_OWN_CART,
    PERMISSION_ENUM.CAN_READ_ANY_CART,
  )
  @Query(() => [CartSchema], { name: 'cart' })
  findAll(
    @Context('user') { id: userId }: UserSchema,
    @Args('paginationOptions') paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.cartService.findAll(userId, paginationOptionsInput);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(PERMISSION_ENUM.CAN_READ_ANY_CART)
  @Query(() => [CartSchema])
  findAllByUserId(
    @Args('userId') { id }: IdInput,
    @Args('paginationOptions') paginationOptionsInput: PaginationOptionsInput,
  ) {
    return this.cartService.findAll(id, paginationOptionsInput);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(
    PERMISSION_ENUM.CAN_DELETE_ANY_CART,
    PERMISSION_ENUM.CAN_DELETE_OWN_CART,
  )
  @Mutation(() => Boolean)
  updateCart(
    @Args('cartId') { id }: IdInput,
    @Args('updateCartInput') updateCartInput: UpdateCartInput,
  ) {
    return this.cartService.update(id, updateCartInput);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(
    PERMISSION_ENUM.CAN_DELETE_ANY_CART,
    PERMISSION_ENUM.CAN_DELETE_OWN_CART,
  )
  @Mutation(() => Boolean)
  removeCart(@Args('cartId') { id }: IdInput) {
    return this.cartService.remove(id);
  }
}
