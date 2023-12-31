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

@Injectable()
export class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly userService: UserService,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
  ) {}

  async create(
    userId: string,
    { categories, tags, ...createArticleInput }: CreateArticleInput,
  ) {
    const article = await this.articleRepository.create(userId, {
      ...createArticleInput,
    });

    await this.tagService.create({
      userId,
      articleId: article.id,
      name: tags,
    });

    await this.categoryService.create({
      userId,
      articleId: article.id,
      name: categories,
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

  async findMany(ids: string[]) {
    return this.articleRepository.findMany(ids);
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
}
