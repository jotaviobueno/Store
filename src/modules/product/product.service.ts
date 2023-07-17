import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { ProductRepository } from './product.repository';
import {
  CreateProductInput,
  PaginationOptionsInput,
  UpdateProductInput,
} from '../../domain/dtos';
import { UserService } from '../user/user.service';
import { StockService } from '../stock/stock.service';
import { STOCK_ENUM } from 'src/domain/enums';
import { StripeService } from '../stripe/stripe.service';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly userService: UserService,
    private readonly stockService: StockService,
    private readonly stripeService: StripeService,
  ) {}

  // TODO: Arrumar isso, tentar deixar a criação do produto por ultimo
  async create(
    userId: string,
    { stock, ...createProductInput }: CreateProductInput,
  ) {
    const product = await this.productRepository.create(
      userId,
      createProductInput,
    );

    const stripeProduct = await this.stripeService.createProduct(
      {
        stock,
        ...createProductInput,
      },
      product.id,
    );

    // TODO: PREÇO ESTÁ SENDO CADASTRADO ERRADO NA STRIPE E NO BANCO
    const price = await this.stripeService.createPrice(
      createProductInput.price,
      stripeProduct.id,
    );

    await this.productRepository.update(product.id, { priceId: price.id });

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

  findMany(productsIds: string[]) {
    return this.productRepository.findMany(productsIds);
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
