import { RolePermission } from '@prisma/client';

export class RolePermissionSchema implements RolePermission {
  id: string;

  permissionId: string;

  roleId: string;
}
