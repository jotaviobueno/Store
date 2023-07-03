import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TagService } from './tag.service';
import { ArticleSchema, TagSchema } from 'src/domain/schemas';
import {
  IdInput,
  PaginationOptionsInput,
  UpdateTagInput,
} from 'src/domain/dtos';

@Resolver(() => TagSchema)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Query(() => [TagSchema], { name: 'tags' })
  findAll(@Args('paginationOption') paginationOption: PaginationOptionsInput) {
    return this.tagService.findAll(paginationOption);
  }

  @Query(() => TagSchema, { name: 'tag' })
  findOne(@Args('tagId') { id }: IdInput) {
    return this.tagService.findOne(id);
  }

  @Mutation(() => TagSchema)
  updateTag(
    @Args('tagId') { id }: IdInput,
    @Args('updateTagInput') updateTagInput: UpdateTagInput,
  ) {
    return this.tagService.update(id, updateTagInput);
  }

  @Mutation(() => Boolean)
  removeTag(@Args('tagId') { id }: IdInput) {
    return this.tagService.remove(id);
  }

  @ResolveField(() => [ArticleSchema])
  articles(
    @Parent()
    { id: tagId }: TagSchema,
  ) {
    return this.tagService.getArticlesByTagId(tagId);
  }
}
