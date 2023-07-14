import { Injectable } from '@nestjs/common';
import { environment } from 'src/config/environment';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor() {
    this.stripe = new Stripe(environment.STRIPE_SECRET_KEY, {
      apiVersion: '2022-11-15',
    });
  }

  createCustomer(name: string, email: string) {
    return this.stripe.customers.create({
      name,
      email,
    });
  }

  async charge(amount: number, paymentMethodId: string, customerId: string) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: 'brl',
      confirm: true,
    });
  }
}
