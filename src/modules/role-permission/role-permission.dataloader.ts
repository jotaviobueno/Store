import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { PermissionSchema } from 'src/domain/schemas';
import { RolePermissionService } from './role-permission.service';
import { PermissionService } from '../permission/permission.service';

@Injectable({ scope: Scope.REQUEST })
export class RolePermissionLoader {
  private readonly dataLoader: DataLoader<string, PermissionSchema[]>;
  name = 'RolePermissionLoader';

  constructor(
    private readonly rolePermissionService: RolePermissionService,
    private readonly permissionService: PermissionService,
  ) {
    this.dataLoader = new DataLoader<string, PermissionSchema[]>(
      (keys) => this.batchRolePermission([...keys]),
      {
        cache: true,
      },
    );
  }

  private async batchRolePermission(
    rolesIds: string[],
  ): Promise<PermissionSchema[][]> {
    const rolesPermissions = await this.rolePermissionService.findManyByRoleId(
      rolesIds,
    );

    const permissionIds = rolesPermissions.map(
      (rolePermission) => rolePermission.permissionId,
    );

    const permissions = await this.permissionService.findMany(permissionIds);

    const permissionMap: Record<string, PermissionSchema[]> = {};

    rolesIds.forEach((roleId) => {
      permissions.forEach((permission) => {
        if (!permissionMap[roleId]) permissionMap[roleId] = [];

        permissionMap[roleId].push(permission);
      });
    });

    return rolesIds.map((id) => permissionMap[id]);
  }

  load(key: string): Promise<PermissionSchema[]> {
    return this.dataLoader.load(key);
  }
}
