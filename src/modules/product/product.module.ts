import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { ProductRepository } from './product.repository';
import { AccessModule } from '../access/access.module';
import { UserModule } from '../user/user.module';
import { UserRoleModule } from '../user-role/user-role.module';
import { StockModule } from '../stock/stock.module';

@Module({
  imports: [AccessModule, UserModule, UserRoleModule, StockModule],
  providers: [ProductResolver, ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
