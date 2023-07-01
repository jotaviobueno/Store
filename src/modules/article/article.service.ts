import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateArticleInput,
  PaginationOptionsInput,
  SearchArticleInput,
  UpdateArticleInput,
} from 'src/domain/dtos';
import { ArticleRepository } from './article.repository';
import { UserService } from '../user/user.service';
import { TagService } from '../tag/tag.service';
import { CategoryService } from '../category/category.service';
import { ArticleTagService } from '../article-tag/article-tag.service';
import { ArticleCategoryService } from '../article-category/article-category.service';

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly userService: UserService,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
    private readonly articleTagService: ArticleTagService,
    private readonly articleCategoryService: ArticleCategoryService,
  ) {}

  async create(
    userId: string,
    { categories, tags, ...createArticleInput }: CreateArticleInput,
  ) {
    const tagsCreated = await this.tagService.create({
      userId,
      name: tags,
    });

    const categoriesCreated = await this.categoryService.create({
      userId,
      name: categories,
    });

    const article = await this.articleRepository.create(userId, {
      ...createArticleInput,
      tags: tagsCreated.map((tag) => tag.id),
      categories: categoriesCreated.map((category) => category.id),
    });

    return article;
  }

  findAll(
    paginationOptions: PaginationOptionsInput,
    searchArticleInput: SearchArticleInput,
  ) {
    return this.articleRepository.findAll(
      paginationOptions,
      searchArticleInput,
    );
  }

  async findOne(id: string) {
    const article = await this.articleRepository.findOne(id);

    if (!article)
      throw new HttpException('Article not found', HttpStatus.NOT_FOUND);

    return article;
  }

  async findMany(id: string) {
    return this.articleRepository.findMany(id);
  }

  async update(id: string, updateArticleInput: UpdateArticleInput) {
    const article = await this.findOne(id);

    const update = await this.articleRepository.update(
      article.id,
      updateArticleInput,
    );

    if (!update)
      throw new HttpException(
        'Failed to update this article',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return update;
  }

  async remove(id: string) {
    const article = await this.findOne(id);

    const remove = await this.articleRepository.softDelete(article.id);

    if (!remove)
      throw new HttpException(
        'Failed to remove this article',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return true;
  }

  getAuthor(userId: string) {
    return this.userService.findOne(userId);
  }
}
