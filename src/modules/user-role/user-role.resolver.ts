import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserRoleService } from './user-role.service';
import { UserRoleSchema } from '../../domain/schemas';
import { UserRoleInput } from '../../domain/dtos';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../access/guard/auth.guard';
import { Roles } from '../role/decorator/role.decorator';
import { PERMISSION_ENUM, ROLE_ENUM } from '../../domain/enums';
import { Permissions } from '../permission/decorator/permission.decorator';
import { RoleGuard } from '../role/guards/role.guard';

@Resolver(() => UserRoleSchema)
export class UserRoleResolver {
  constructor(private readonly userRoleService: UserRoleService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(ROLE_ENUM.SUPER_ADMIN)
  @Permissions(PERMISSION_ENUM.CAN_ASSIGN_USER_ROLE)
  @Mutation(() => UserRoleSchema, { name: 'assignUserInRole' })
  create(@Args('userRoleInput') userRoleInput: UserRoleInput) {
    return this.userRoleService.create(userRoleInput);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(ROLE_ENUM.SUPER_ADMIN)
  @Permissions(PERMISSION_ENUM.CAN_ASSIGN_USER_ROLE)
  @Mutation(() => Boolean, { name: 'removeUserRole' })
  remove(@Args('userRoleInput') userRoleInput: UserRoleInput) {
    return this.userRoleService.remove(userRoleInput);
  }
}
