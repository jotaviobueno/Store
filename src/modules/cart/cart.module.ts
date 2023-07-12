import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { CartRepository } from './cart.repository';
import { ProductModule } from '../product/product.module';
import { AccessModule } from '../access/access.module';
import { UserModule } from '../user/user.module';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [ProductModule, AccessModule, UserModule, StockModule],
  providers: [CartResolver, CartService, CartRepository],
  exports: [CartService],
})
export class CartModule {}
