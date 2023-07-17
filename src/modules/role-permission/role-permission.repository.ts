import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RolePermissionSchema } from '../../domain/schemas';

@Injectable()
export class RolePermissionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findByRoleId(roleId: string): Promise<RolePermissionSchema[]> {
    return this.prismaService.rolePermission.findMany({
      where: {
        roleId,
      },
    });
  }

  findManyByRoleId(rolesIds: string[]): Promise<RolePermissionSchema[]> {
    return this.prismaService.rolePermission.findMany({
      where: {
        roleId: {
          in: rolesIds,
        },
      },
    });
  }
}
