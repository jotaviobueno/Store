import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserRoleInput } from '../../domain/dtos';
import {
  PermissionSchema,
  RolePermissionSchema,
  RoleSchema,
  UserRoleSchema,
} from '../../domain/schemas';

@Injectable()
export class UserRoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserRoleInput: UserRoleInput): Promise<UserRoleSchema> {
    return this.prismaService.userRole.create({
      data: {
        ...createUserRoleInput,
      },
    });
  }

  findByUserIdAndRoleId(
    createUserRoleInput: UserRoleInput,
  ): Promise<UserRoleSchema> {
    return this.prismaService.userRole.findFirst({
      where: {
        ...createUserRoleInput,
      },
    });
  }

  destroy(id: string): Promise<UserRoleSchema> {
    return this.prismaService.userRole.delete({
      where: {
        id,
      },
    });
  }

  findAllUserRoleWithUserId(userId: string): Promise<
    (UserRoleSchema & {
      Role: RoleSchema & {
        rolePermission: (RolePermissionSchema & {
          Permission: PermissionSchema;
        })[];
      };
    })[]
  > {
    return this.prismaService.userRole.findMany({
      where: {
        userId,
      },
      include: {
        Role: {
          include: {
            rolePermission: {
              include: {
                Permission: true,
              },
            },
          },
        },
      },
    });
  }
}
