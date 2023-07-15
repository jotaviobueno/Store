import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RoleSchema } from "../../domain/schemas";
import { PaginationOptionsInput } from "../../domain/dtos";

@Injectable()
export class RoleRepository {
  constructor(private readonly prismaService: PrismaService) {
  }

  findAll({ page, per_page }: PaginationOptionsInput): Promise<RoleSchema[]> {
    return this.prismaService.role.findMany({
      where: {},
      skip: (page - 1) * per_page,
      take: per_page
    });
  }

  findOne(id: string): Promise<RoleSchema> {
    return this.prismaService.role.findUnique({
      where: {
        id
      }
    });
  }

  findMany(rolesIds: string[]): Promise<RoleSchema[]> {
    return this.prismaService.role.findMany({
      where: {
        id: {
          in: rolesIds
        }
      }
    });
  }
}
