import { Module, forwardRef } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { CategoryRepository } from './category.repository';
import { ArticleCategoryModule } from '../article-category/article-category.module';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [ArticleCategoryModule, forwardRef(() => ArticleModule)],
  providers: [CategoryResolver, CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
