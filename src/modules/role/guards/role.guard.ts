import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { UserSchema } from '../../../domain/schemas';
import { UserRoleService } from '../../user-role/user-role.service';
import { ROLE_KEY } from '../decorator/role.decorator';
import { PERMISSION_KEY } from '../../permission/decorator/permission.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly userRoleService: UserRoleService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const user = GqlExecutionContext.create(context).getContext()
      .user as UserSchema;

    if (!user) return false;

    const permissionsAndRoles =
      await this.userRoleService.findAllUserRoleWithUserId(user.id);

    const requiredPermissions: string[] = this.reflector.getAllAndOverride(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );

    const requiredRoles: string[] = this.reflector.getAllAndOverride(ROLE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    let hasPermission = false;

    for (const { Role: role } of permissionsAndRoles) {
      if (
        requiredRoles?.length >= 1 &&
        requiredRoles.some((requiredRole) => requiredRole === role.name)
      )
        hasPermission = true;

      if (requiredPermissions?.length >= 1)
        for (const { Permission: permission } of role.rolePermission) {
          if (
            requiredPermissions.some(
              (requiredPermission) => requiredPermission === permission.name,
            )
          )
            hasPermission = true;
        }
    }

    return hasPermission;
  }
}
