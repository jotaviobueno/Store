import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionSchema } from '../../domain/schemas';

@Injectable()
export class PermissionRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findMany(ids: string[]): Promise<PermissionSchema[]> {
    return this.prismaService.permission.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }
}
