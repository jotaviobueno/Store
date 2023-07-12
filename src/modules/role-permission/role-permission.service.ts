import { Injectable } from '@nestjs/common';
import { RolePermissionRepository } from './role-permission.repository';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class RolePermissionService {
  constructor(
    private readonly rolePermissionRepository: RolePermissionRepository,
    private readonly permissionService: PermissionService,
  ) {}

  async handle(roleId: string) {
    const rolePermissions = await this.findByRoleId(roleId);

    return this.permissionService.findMany(
      rolePermissions.map((rolePermission) => rolePermission.permissionId),
    );
  }

  private findByRoleId(roleId: string) {
    return this.rolePermissionRepository.findByRoleId(roleId);
  }
}
