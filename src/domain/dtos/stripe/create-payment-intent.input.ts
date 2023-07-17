export class CreatePaymentIntentInput {
  amount: number;

  customer: string;

  source: string;

  constructor() {
    this.amount = this.amount * 100;
  }
}
