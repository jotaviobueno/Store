import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { CategorySchema } from 'src/domain/schemas';
import { ArticleCategoryService } from './article-category.service';
import { CategoryService } from '../category/category.service';

@Injectable({ scope: Scope.REQUEST })
export class ArticleCategoryLoader {
  private readonly dataLoader: DataLoader<string, CategorySchema[]>;
  name = 'ArticleCategoryDataloader';

  constructor(
    private readonly articleCategoryService: ArticleCategoryService,
    private readonly categoryService: CategoryService,
  ) {
    this.dataLoader = new DataLoader<string, CategorySchema[]>(
      (keys) => this.batchArticleCategory([...keys]),
      {
        cache: true,
      },
    );
  }

  private async batchArticleCategory(
    articlesIds: string[],
  ): Promise<CategorySchema[][]> {
    const articlesCategories =
      await this.articleCategoryService.findManyByArticleId(articlesIds);

    const categoryIds = articlesCategories.map(
      (articleCategory) => articleCategory.categoryId,
    );

    const categories = await this.categoryService.findMany(categoryIds);

    const categoriesMap: Record<string, CategorySchema[]> = {};

    articlesIds.forEach((articleId) => {
      categories.forEach((category) => {
        if (!categoriesMap[articleId]) categoriesMap[articleId] = [];

        categoriesMap[articleId].push(category);
      });
    });

    return articlesIds.map((id) => categoriesMap[id]);
  }

  load(key: string): Promise<CategorySchema[]> {
    return this.dataLoader.load(key);
  }
}
