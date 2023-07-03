import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleCategoryInput } from 'src/domain/dtos';
import { ArticleCategoryRepository } from './article-category.repository';

@Injectable()
export class ArticleCategoryService {
  constructor(
    private readonly articleCategoryRepository: ArticleCategoryRepository,
  ) {}

  create(createArticleCategoryInput: CreateArticleCategoryInput) {
    return this.articleCategoryRepository.create(createArticleCategoryInput);
  }

  async findByArticleId(articleId: string) {
    const categories = await this.articleCategoryRepository.findByArticleId(
      articleId,
    );

    if (!categories)
      throw new HttpException('Category not found', HttpStatus.NOT_FOUND);

    return categories;
  }

  findByCategoryId(categoryId: string) {
    return this.articleCategoryRepository.findByCategoryId(categoryId);
  }
}
