import {
  Injectable,
  Logger,
  UnprocessableEntityException,
} from '@nestjs/common';
import { environment } from 'src/config/environment';
import { CreatePaymentIntentInput, CreateProductInput } from 'src/domain/dtos';
import { LineItemsSchema } from 'src/domain/schemas';
import Stripe from 'stripe';
import { OrderService } from '../order/order.service';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(environment.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  async success(orderId: string) {
    // const order = await this.orderService.findOne(orderId);
    // const paymentStatus = await this.stripe.checkout.sessions.retrieve(
    //   order.stripeId,
    // );
    // console.log(paymentStatus);
  }

  createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  createProduct(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { imagesUrl, stock, price, ...createProductInput }: CreateProductInput,
    productId: string,
  ) {
    return this.stripe.products.create({
      ...createProductInput,
      id: productId,
    });
  }

  createPrice(price: number, productId: string) {
    return this.stripe.prices.create({
      unit_amount: price * 100,
      currency: environment.STRIPE_CURRENCY,
      product: productId,
    });
  }

  createCheckout(lineItems: LineItemsSchema[], orderId: string) {
    return this.stripe.checkout.sessions.create({
      line_items: lineItems,
      mode: 'payment',
      success_url: `${environment.STRIPE_SUCCESS_URL}?id=${orderId}`,
      cancel_url: `${environment.STRIPE_FAILED_URL}?id=${orderId}`,
    });
  }

  createPaymentIntent(
    createPaymentIntentInput: CreatePaymentIntentInput,
  ): Promise<Stripe.PaymentIntent> {
    try {
      return this.stripe.paymentIntents.create({
        ...createPaymentIntentInput,
        payment_method_types: ['card'],
        currency: environment.STRIPE_CURRENCY,
      });
    } catch (error) {
      Logger.error('[stripe.service] Error creating a payment intent');

      throw new UnprocessableEntityException(
        'The payment intent could not be created',
      );
    }
  }
}
