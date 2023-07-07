import { Injectable, UseGuards } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleSchema } from '../../domain/schemas';
import { PaginationOptionsInput } from '../../domain/dtos';
import { AuthGuard } from '../access/guard/auth.guard';
import { Permissions } from '../permission/decorator/permission.decorator';
import { PERMISSION_ENUM, ROLE_ENUM } from '../../domain/enums';
import { Roles } from './decorator/role.decorator';

@UseGuards(AuthGuard)
@Roles(ROLE_ENUM.SUPER_ADMIN)
@Permissions(PERMISSION_ENUM.CAN_READ_ROLE)
@Injectable()
export class RoleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  findAll({ page, per_page }: PaginationOptionsInput): Promise<RoleSchema[]> {
    return this.prismaService.role.findMany({
      where: {},
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findOne(id: string): Promise<RoleSchema> {
    return this.prismaService.role.findUnique({
      where: {
        id,
      },
    });
  }
}
