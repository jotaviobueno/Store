import { forwardRef, Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { ArticleRepository } from './article.repository';
import { UserModule } from '../user/user.module';
import { AccessModule } from '../access/access.module';
import { TagModule } from '../tag/tag.module';
import { CategoryModule } from '../category/category.module';
import { ArticleCategoryModule } from '../article-category/article-category.module';
import { ArticleTagModule } from '../article-tag/article-tag.module';
import { UserRoleModule } from '../user-role/user-role.module';

@Module({
  imports: [
    UserModule,
    AccessModule,
    forwardRef(() => TagModule),
    CategoryModule,
    ArticleTagModule,
    ArticleCategoryModule,
    UserRoleModule,
  ],
  providers: [ArticleResolver, ArticleService, ArticleRepository],
  exports: [ArticleService],
})
export class ArticleModule {}
