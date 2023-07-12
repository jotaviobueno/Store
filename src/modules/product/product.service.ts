import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import {
  CreateProductInput,
  PaginationOptionsInput,
  UpdateProductInput,
} from '../../domain/dtos';
import { UserService } from '../user/user.service';
import { StockService } from '../stock/stock.service';
import { STOCK_ENUM } from 'src/domain/enums';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userService: UserService,
    private readonly stockService: StockService,
  ) {}

  async create(
    userId: string,
    { stock, ...createProductInput }: CreateProductInput,
  ) {
    const product = await this.productRepository.create(
      userId,
      createProductInput,
    );

    await this.stockService.create({
      productId: product.id,
      stock,
      type: STOCK_ENUM.INPUT,
    });

    return product;
  }

  findAll(paginationOptions: PaginationOptionsInput) {
    return this.productRepository.findAll(paginationOptions);
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOne(id);

    if (!product)
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);

    return product;
  }

  async update(
    id: string,
    { stock = null, ...updateProductInput }: UpdateProductInput,
  ) {
    const product = await this.findOne(id);

    if (stock) {
      const totalStock = await this.stockService.getTotalStock(product.id);

      if (stock === totalStock)
        throw new HttpException(
          'number reported is equal to the current stock',
          HttpStatus.BAD_REQUEST,
        );

      if (stock > totalStock)
        await this.stockService.create({
          productId: product.id,
          stock: stock - totalStock,
          type: STOCK_ENUM.INPUT,
        });
      else await this.stockService.remove(product.id, stock);
    }

    const update = await this.productRepository.update(
      product.id,
      updateProductInput,
    );

    if (!update)
      throw new HttpException('failed to update', HttpStatus.NOT_ACCEPTABLE);

    return update;
  }

  async remove(id: string) {
    const product = await this.findOne(id);

    const remove = await this.productRepository.softDelete(product.id);

    if (!remove)
      throw new HttpException('failed to remove', HttpStatus.NOT_ACCEPTABLE);

    return true;
  }

  getProductOwner(userId: string) {
    return this.userService.findOne(userId);
  }

  getStock(productId: string) {
    return this.stockService.getTotalStock(productId);
  }

  getStockHistory(productId: string) {
    return this.stockService.findAll(productId);
  }
}
