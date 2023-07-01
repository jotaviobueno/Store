import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { CategoryRepository } from './category.repository';

@Module({
  providers: [CategoryResolver, CategoryService, CategoryRepository],
  exports: [CategoryService],
})
export class CategoryModule {}
