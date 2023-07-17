import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
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
import { PERMISSION_ENUM } from '../../domain/enums';
import { Permissions } from '../permission/decorator/permission.decorator';
import { RoleGuard } from '../role/guards/role.guard';
import { UserLoader } from '../user/user.dataloader';
import { ArticleCategoryLoader } from '../article-category/article-category.dataloader';
import { ArticleTagLoader } from '../article-tag/article-tag.dataloader';

@Resolver(() => ArticleSchema)
export class ArticleResolver {
  constructor(
    private readonly articleService: ArticleService,
    private readonly userLoader: UserLoader,
    private readonly articleCategoryLoader: ArticleCategoryLoader,
    private readonly articleTagLoader: ArticleTagLoader,
  ) {}

  @UseGuards(AuthGuard)
  @Permissions(PERMISSION_ENUM.CAN_CREATE_ARTICLE)
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

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(
    PERMISSION_ENUM.CAN_UPDATE_ANY_ARTICLE,
    PERMISSION_ENUM.CAN_UPDATE_OWN_ARTICLE,
  )
  @Mutation(() => ArticleSchema)
  updateArticle(
    @Args('articleId') { id }: IdInput,
    @Args('updateArticleInput') updateArticleInput: UpdateArticleInput,
  ) {
    return this.articleService.update(id, updateArticleInput);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(
    PERMISSION_ENUM.CAN_DELETE_ANY_ARTICLE,
    PERMISSION_ENUM.CAN_DELETE_OWN_ARTICLE,
  )
  @Mutation(() => ArticleSchema)
  removeArticle(@Args('articleId') { id }: IdInput) {
    return this.articleService.remove(id);
  }

  @ResolveField(() => [UserSchema])
  author(
    @Parent()
    { userId }: ArticleSchema,
  ) {
    return this.userLoader.load(userId);
  }

  @ResolveField(() => [CategorySchema])
  categories(
    @Parent()
    { id: articleId }: ArticleSchema,
  ) {
    return this.articleCategoryLoader.load(articleId);
  }

  @ResolveField(() => [TagSchema])
  tags(
    @Parent()
    { id: articleId }: ArticleSchema,
  ) {
    return this.articleTagLoader.load(articleId);
  }
}
