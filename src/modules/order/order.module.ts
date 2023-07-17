import { Module, forwardRef } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { OrderRepository } from './order.repository';
import { StockModule } from '../stock/stock.module';
import { CartModule } from '../cart/cart.module';
import { StripeModule } from '../stripe/stripe.module';
import { AccessModule } from '../access/access.module';
import { UserModule } from '../user/user.module';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    StockModule,
    CartModule,
    //
    forwardRef(() => StripeModule),
    AccessModule,
    UserModule,
    //
    ProductModule,
  ],
  providers: [OrderResolver, OrderService, OrderRepository],
  exports: [OrderService],
})
export class OrderModule {}
