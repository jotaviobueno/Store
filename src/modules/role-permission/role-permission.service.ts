import { Injectable } from '@nestjs/common';
import { RolePermissionRepository } from './role-permission.repository';
import { PermissionService } from '../permission/permission.service';

@Injectable()
export class RolePermissionService {
  constructor(
    private readonly rolePermissionRepository: RolePermissionRepository,
    private readonly permissionService: PermissionService,
  ) {}

  findManyByRoleId(rolesIds: string[]) {
    return this.rolePermissionRepository.findManyByRoleId(rolesIds);
  }
}
