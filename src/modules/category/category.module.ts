import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { CategoryRepository } from './category.repository';
import { ArticleCategoryModule } from '../article-category/article-category.module';
import { AccessModule } from '../access/access.module';
import { UserModule } from '../user/user.module';
import { UserRoleModule } from '../user-role/user-role.module';

@Module({
  imports: [ArticleCategoryModule, AccessModule, UserModule, UserRoleModule],
  providers: [CategoryResolver, CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
