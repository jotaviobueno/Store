import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { ArticleSchema, CategorySchema } from 'src/domain/schemas';
import {
  IdInput,
  PaginationOptionsInput,
  UpdateCategoryInput,
} from 'src/domain/dtos';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../access/guard/auth.guard';
import { PERMISSION_ENUM } from '../../domain/enums';
import { Permissions } from '../permission/decorator/permission.decorator';
import { RoleGuard } from '../role/guards/role.guard';

@Resolver(() => CategorySchema)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [CategorySchema], { name: 'categories' })
  findAll(
    @Args('paginationOptions') paginationOptions: PaginationOptionsInput,
  ) {
    return this.categoryService.findAll(paginationOptions);
  }

  @Query(() => CategorySchema, { name: 'category' })
  findOne(@Args('categoryId') { id }: IdInput) {
    return this.categoryService.findOne(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(
    PERMISSION_ENUM.CAN_UPDATE_OWN_CATEGORY,
    PERMISSION_ENUM.CAN_UPDATE_ANY_CATEGORY,
  )
  @Mutation(() => CategorySchema)
  updateCategory(
    @Args('categoryId') { id }: IdInput,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(id, updateCategoryInput);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(
    PERMISSION_ENUM.CAN_DELETE_OWN_CATEGORY,
    PERMISSION_ENUM.CAN_DELETE_ANY_CATEGORY,
  )
  @Mutation(() => Boolean)
  removeCategory(@Args('categoryId') { id }: IdInput) {
    return this.categoryService.remove(id);
  }

  @ResolveField(() => [ArticleSchema])
  articles(
    @Parent()
    { id: categoryId }: CategorySchema,
  ) {
    return this.categoryService.getArticlesByCategoryId(categoryId);
  }
}
