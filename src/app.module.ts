import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { UserModule } from './modules/user/user.module';
import { AccessModule } from './modules/access/access.module';
import { ArticleModule } from './modules/article/article.module';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
import { ArticleTagModule } from './modules/article-tag/article-tag.module';
import { ArticleCategoryModule } from './modules/article-category/article-category.module';
import { RoleModule } from './modules/role/role.module';
import { UserRoleModule } from './modules/user-role/user-role.module';
import { RolePermissionModule } from './modules/role-permission/role-permission.module';
import { PermissionModule } from './modules/permission/permission.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { StockModule } from './modules/stock/stock.module';
import { LogModule } from './modules/log/log.module';
import { StripeModule } from './modules/stripe/stripe.module';
import { OrderModule } from './modules/order/order.module';

@Module({
  imports: [
    PrismaModule,
    GraphqlModule,
    UserModule,
    AccessModule,
    ArticleModule,
    CategoryModule,
    TagModule,
    ArticleTagModule,
    ArticleCategoryModule,
    RoleModule,
    UserRoleModule,
    RolePermissionModule,
    PermissionModule,
    ProductModule,
    CartModule,
    StockModule,
    LogModule,
    StripeModule,
    OrderModule,
  ],
})
export class AppModule {}
