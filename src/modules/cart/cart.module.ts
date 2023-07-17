import { Module, forwardRef } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { CartRepository } from './cart.repository';
import { ProductModule } from '../product/product.module';
import { AccessModule } from '../access/access.module';
import { UserModule } from '../user/user.module';
import { StockModule } from '../stock/stock.module';
import { UserRoleModule } from '../user-role/user-role.module';

@Module({
  imports: [
    forwardRef(() => ProductModule),
    AccessModule,
    UserModule,
    StockModule,
    AccessModule,
    UserRoleModule,
  ],
  providers: [CartResolver, CartService, CartRepository],
  exports: [CartService],
})
export class CartModule {}
