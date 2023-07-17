import {
  Args,
  Context,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductSchema, StockSchema, UserSchema } from '../../domain/schemas';
import {
  CreateProductInput,
  IdInput,
  PaginationOptionsInput,
  UpdateProductInput,
} from '../../domain/dtos';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../access/guard/auth.guard';
import { Permissions } from '../permission/decorator/permission.decorator';
import { PERMISSION_ENUM } from '../../domain/enums';
import { RoleGuard } from '../role/guards/role.guard';

@Resolver(() => ProductSchema)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard)
  @Permissions(PERMISSION_ENUM.CAN_CREATE_PRODUCT)
  @Mutation(() => ProductSchema)
  createProduct(
    @Context('user') { id: userId }: UserSchema,
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    return this.productService.create(userId, createProductInput);
  }

  @Query(() => [ProductSchema], { name: 'products' })
  findAll(
    @Args('paginationOptions') paginationOptions: PaginationOptionsInput,
  ) {
    return this.productService.findAll(paginationOptions);
  }

  @Query(() => ProductSchema, { name: 'product' })
  findOne(@Args('productId') { id }: IdInput) {
    return this.productService.findOne(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(
    PERMISSION_ENUM.CAN_UPDATE_ANY_PRODUCT,
    PERMISSION_ENUM.CAN_UPDATE_OWN_PRODUCT,
  )
  @Mutation(() => ProductSchema)
  updateProduct(
    @Args('productId') { id }: IdInput,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    return this.productService.update(id, updateProductInput);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(
    PERMISSION_ENUM.CAN_DELETE_ANY_PRODUCT,
    PERMISSION_ENUM.CAN_DELETE_OWN_PRODUCT,
  )
  @Mutation(() => Boolean)
  removeProduct(@Args('productId') { id }: IdInput) {
    return this.productService.remove(id);
  }

  @ResolveField(() => UserSchema)
  productOwner(
    @Parent()
    { userId }: ProductSchema,
  ) {
    return this.productService.getProductOwner(userId);
  }

  @ResolveField(() => Int)
  totalStock(
    @Parent()
    { id }: ProductSchema,
  ) {
    return this.productService.getStock(id);
  }

  @ResolveField(() => [StockSchema])
  stockHistory(
    @Parent()
    { id }: ProductSchema,
  ) {
    return this.productService.getStockHistory(id);
  }
}
