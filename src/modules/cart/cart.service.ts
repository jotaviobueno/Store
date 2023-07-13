import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateCartInput,
  PaginationOptionsInput,
  UpdateCartInput,
} from '../../domain/dtos';
import { CartRepository } from './cart.repository';
import { ProductService } from '../product/product.service';
import { StockService } from '../stock/stock.service';
import { UserService } from '../user/user.service';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productService: ProductService,
    private readonly stockService: StockService,
    private readonly userService: UserService,
  ) {}

  async create(userId: string, createCartInput: CreateCartInput) {
    const product = await this.productService.findOne(
      createCartInput.productId,
    );

    const totalStock = await this.stockService.getTotalStock(product.id);

    if (createCartInput.quantity > totalStock)
      throw new HttpException(
        `the product has a maximum stock of ${totalStock}`,
        HttpStatus.NOT_ACCEPTABLE,
      );

    const cart = await this.cartRepository.create(userId, createCartInput);

    return cart;
  }

  findAll(userId: string, paginationOptions: PaginationOptionsInput) {
    return this.cartRepository.findAll(userId, paginationOptions);
  }

  async findAllByUserId(
    userId: string,
    paginationOptions: PaginationOptionsInput,
  ) {
    const user = await this.userService.findOne(userId);

    return this.cartRepository.findAll(user.id, paginationOptions);
  }

  async findOne(id: string) {
    const cart = await this.cartRepository.findById(id);

    if (!cart) throw new HttpException('cart not found', HttpStatus.NOT_FOUND);

    return cart;
  }

  async update(id: string, updateCartInput: UpdateCartInput) {
    const cart = await this.findOne(id);

    const update = await this.cartRepository.update(cart.id, updateCartInput);

    if (!update)
      throw new HttpException(
        'failed to update cart',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return update;
  }

  async remove(id: string) {
    const cart = await this.findOne(id);

    const remove = await this.cartRepository.softDelete(cart.id);

    if (!remove)
      throw new HttpException(
        'failed to remove from cart',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return true;
  }
}
