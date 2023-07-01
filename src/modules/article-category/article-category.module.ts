import { Module } from '@nestjs/common';
import { ArticleCategoryService } from './article-category.service';
import { ArticleCategoryRepository } from './article-category.repository';

@Module({
  providers: [ArticleCategoryService, ArticleCategoryRepository],
  exports: [ArticleCategoryService],
})
export class ArticleCategoryModule {}
