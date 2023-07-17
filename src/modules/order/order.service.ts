import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { CreateOrderInput } from 'src/domain/dtos';
import { OrderRepository } from './order.repository';
import { StockService } from '../stock/stock.service';
import { CartService } from '../cart/cart.service';
import { StripeService } from '../stripe/stripe.service';
import { ProductService } from '../product/product.service';
import { LineItemsSchema } from 'src/domain/schemas';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly productService: ProductService,
    private readonly stripeService: StripeService,
    private readonly stockService: StockService,
    private readonly cartService: CartService,
  ) {}

  async create(createOrderInput: CreateOrderInput) {
    const carts = await this.cartService.findMany(createOrderInput.cartId);

    const productsIds = carts.map((cart) => cart.productId);

    const products = await this.productService.findMany(productsIds);

    const totalStock = await this.stockService.getManyTotalStock(productsIds);

    let onlyLineItems: LineItemsSchema[] = [];

    for (const cart of carts) {
      if (!cart || (cart && cart.userId != createOrderInput.userId))
        throw new HttpException(`Cart not found`, HttpStatus.NOT_FOUND);

      if (cart.quantity > totalStock)
        throw new HttpException(
          `esse item no carrinho ${cart.id}, tem apenas ${totalStock} total, e você está tentando comprar um valor acima do stock desse produto, ${cart.quantity}`,
          HttpStatus.BAD_REQUEST,
        );

      onlyLineItems = products.map((product) => ({
        price: product.priceId,
        quantity: cart.quantity,
      }));
    }

    const order = await this.orderRepository.create({
      userId: createOrderInput.userId,
      productsIds,
    });

    const lineItems = await this.stripeService.createCheckout(
      onlyLineItems,
      order.id,
    );

    await this.orderRepository.update(order.id, lineItems.id);

    console.log(lineItems);

    return order;
  }

  async findOne(orderId: string) {
    const order = await this.orderRepository.findById(orderId);

    if (!order)
      throw new HttpException('order not found', HttpStatus.NOT_FOUND);

    return order;
  }
}
