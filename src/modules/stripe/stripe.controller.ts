import { Controller, Get, Query, Req } from '@nestjs/common';
import { IdInput } from 'src/domain/dtos';
import { StripeService } from './stripe.service';

@Controller('payment')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get('/failed')
  get_failed(@Req() req: any) {
    console.log(req.body, 'get_failed');
  }

  @Get('/success')
  get_success(@Query() { id: orderId }: IdInput) {
    return this.stripeService.success(orderId);
  }
}
