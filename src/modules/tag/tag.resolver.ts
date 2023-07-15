import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TagService } from "./tag.service";
import { TagSchema } from "src/domain/schemas";
import { IdInput, PaginationOptionsInput, UpdateTagInput } from "src/domain/dtos";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../access/guard/auth.guard";
import { Permissions } from "../permission/decorator/permission.decorator";
import { PERMISSION_ENUM } from "../../domain/enums";
import { RoleGuard } from "../role/guards/role.guard";

@Resolver(() => TagSchema)
export class TagResolver {
  constructor(private readonly tagService: TagService) {
  }

  @Query(() => [TagSchema], { name: "tags" })
  findAll(@Args("paginationOption") paginationOption: PaginationOptionsInput) {
    return this.tagService.findAll(paginationOption);
  }

  @Query(() => TagSchema, { name: "tag" })
  findOne(@Args("tagId") { id }: IdInput) {
    return this.tagService.findOne(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(
    PERMISSION_ENUM.CAN_UPDATE_OWN_TAG,
    PERMISSION_ENUM.CAN_UPDATE_ANY_TAG
  )
  @Mutation(() => TagSchema)
  updateTag(
    @Args("tagId") { id }: IdInput,
    @Args("updateTagInput") updateTagInput: UpdateTagInput
  ) {
    return this.tagService.update(id, updateTagInput);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(
    PERMISSION_ENUM.CAN_DELETE_OWN_TAG,
    PERMISSION_ENUM.CAN_DELETE_ANY_TAG
  )
  @Mutation(() => Boolean)
  removeTag(@Args("tagId") { id }: IdInput) {
    return this.tagService.remove(id);
  }
}
