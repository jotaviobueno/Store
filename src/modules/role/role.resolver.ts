import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { RoleService } from './role.service';
import { PermissionSchema, RoleSchema } from '../../domain/schemas';
import { IdInput, PaginationOptionsInput } from '../../domain/dtos';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../access/guard/auth.guard';
import { Roles } from './decorator/role.decorator';
import { PERMISSION_ENUM, ROLE_ENUM } from '../../domain/enums';
import { Permissions } from '../permission/decorator/permission.decorator';

@UseGuards(AuthGuard)
@Roles(ROLE_ENUM.SUPER_ADMIN, ROLE_ENUM.ADMIN)
@Permissions(PERMISSION_ENUM.CAN_READ_ROLE)
@Resolver(() => RoleSchema)
export class RoleResolver {
  constructor(private readonly roleService: RoleService) {}

  @Query(() => [RoleSchema], { name: 'roles' })
  findAll(
    @Args('paginationOptions') paginationOptions: PaginationOptionsInput,
  ) {
    return this.roleService.findAll(paginationOptions);
  }

  @Query(() => RoleSchema, { name: 'role' })
  findOne(@Args('id') { id }: IdInput) {
    return this.roleService.findOne(id);
  }

  @ResolveField(() => [PermissionSchema])
  permissions(
    @Parent()
    { id }: RoleSchema,
  ) {
    return this.roleService.getPermission(id);
  }
}
