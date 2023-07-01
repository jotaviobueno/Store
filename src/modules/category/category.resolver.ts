import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { CategorySchema } from 'src/domain/schemas';
import {
  IdInput,
  PaginationOptionsInput,
  UpdateCategoryInput,
} from 'src/domain/dtos';

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

  @Mutation(() => CategorySchema)
  updateCategory(
    @Args('categoryId') { id }: IdInput,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.categoryService.update(id, updateCategoryInput);
  }

  @Mutation(() => Boolean)
  removeCategory(@Args('categoryId') { id }: IdInput) {
    return this.categoryService.remove(id);
  }
}
