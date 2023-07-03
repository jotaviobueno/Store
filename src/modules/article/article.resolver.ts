import {
  Resolver,
  Query,
  Mutation,
  Args,
  Context,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { ArticleService } from './article.service';
import {
  ArticleSchema,
  CategorySchema,
  TagSchema,
  UserSchema,
} from 'src/domain/schemas';
import {
  CreateArticleInput,
  IdInput,
  PaginationOptionsInput,
  SearchArticleInput,
  UpdateArticleInput,
} from 'src/domain/dtos';
import { AuthGuard } from '../access/guard/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => ArticleSchema)
export class ArticleResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => ArticleSchema)
  @UseGuards(AuthGuard)
  createArticle(
    @Context('user') { id: userId }: UserSchema,
    @Args('createArticleInput') createArticleInput: CreateArticleInput,
  ) {
    return this.articleService.create(userId, createArticleInput);
  }

  @Query(() => [ArticleSchema], { name: 'articles' })
  findAll(
    @Args('paginationOptions') paginationOptions: PaginationOptionsInput,
    @Args('searchArticleInput') searchArticleInput: SearchArticleInput,
  ) {
    return this.articleService.findAll(paginationOptions, searchArticleInput);
  }

  @Query(() => ArticleSchema, { name: 'article' })
  findOne(@Args('articleId') { id }: IdInput) {
    return this.articleService.findOne(id);
  }

  @Mutation(() => ArticleSchema)
  updateArticle(
    @Args('articleId') { id }: IdInput,
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    return this.articleService.update(id, updateArticleInput);
  }

  @Mutation(() => ArticleSchema)
  removeArticle(@Args('articleId') { id }: IdInput) {
    return this.articleService.remove(id);
  }

  @ResolveField(() => UserSchema)
  author(
    @Parent()
    { userId }: ArticleSchema,
  ) {
    return this.articleService.getAuthor(userId);
  }

  @ResolveField(() => [CategorySchema])
  categories(
    @Parent()
    { id: articleId }: ArticleSchema,
  ) {
    return this.articleService.getCategory(articleId);
  }

  @ResolveField(() => [TagSchema])
  tags(
    @Parent()
    { id: articleId }: ArticleSchema,
  ) {
    return this.articleService.getTag(articleId);
  }
}
