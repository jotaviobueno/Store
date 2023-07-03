import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import {
  CreateCategoryInput,
  PaginationOptionsInput,
  UpdateCategoryInput,
} from 'src/domain/dtos';
import { CategoryRepository } from './category.repository';
import { ArticleCategoryService } from '../article-category/article-category.service';
import { ArticleService } from '../article/article.service';

@Injectable()
export class CategoryService {
  constructor(
    private readonly categoryRepository: CategoryRepository,
    private readonly articleCategoryService: ArticleCategoryService,
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
  ) {}

  async create({ articleId, ...createCategoryInput }: CreateCategoryInput) {
    const categories = await Promise.all(
      createCategoryInput.name.map(async (name) => {
        const tagExist = await this.categoryRepository.findByName(name);

        if (tagExist) return tagExist;

        return this.categoryRepository.create(name, createCategoryInput);
      }),
    );

    await Promise.all(
      categories.map(async (categories) => {
        await this.articleCategoryService.create({
          categoryId: categories.id,
          articleId,
        });
      }),
    );

    return categories;
  }

  findAll(paginationOptions: PaginationOptionsInput) {
    return this.categoryRepository.findAll(paginationOptions);
  }

  findMany(categoriesIds: string[]) {
    return this.categoryRepository.findMany(categoriesIds);
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne(id);

    if (!category)
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);

    return category;
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.findOne(id);

    const update = await this.categoryRepository.update(
      category.id,
      updateCategoryInput,
    );

    if (!update)
      throw new HttpException(
        'Failed to update category',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return update;
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    const remove = await this.categoryRepository.softDelete(category.id);

    if (!remove)
      throw new HttpException(
        'Failed to remove category',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return true;
  }

  async getArticlesByCategoryId(categoryId: string) {
    const categories = await this.articleCategoryService.findByCategoryId(
      categoryId,
    );

    return this.articleService.findMany(
      categories.map((category) => category.articleId),
    );
  }
}
