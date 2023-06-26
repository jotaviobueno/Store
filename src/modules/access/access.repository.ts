import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AccessSchema } from 'src/domain/schemas';
import { PaginationOptionsInput } from 'src/domain/dtos';

@Injectable()
export class AccessRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(userId: string, userAgent: string): Promise<AccessSchema> {
    return this.prismaService.access.create({
      data: {
        userId,
        userAgent,
        disconnectedAt: null,
      },
    });
  }

  findOne(id: string): Promise<AccessSchema> {
    return this.prismaService.access.findFirst({
      where: {
        id,
        disconnectedAt: null,
      },
    });
  }

  findByUserAgent(userId: string, userAgent: string): Promise<AccessSchema> {
    return this.prismaService.access.findFirst({
      where: {
        userId,
        userAgent,
        disconnectedAt: null,
      },
    });
  }

  findAll(
    userId: string,
    { page, per_page }: PaginationOptionsInput,
  ): Promise<AccessSchema[]> {
    return this.prismaService.access.findMany({
      where: {
        userId,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  update(id: string): Promise<AccessSchema> {
    return this.prismaService.access.update({
      where: {
        id,
      },
      data: {
        lastAccess: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<AccessSchema> {
    return this.prismaService.access.update({
      where: {
        id,
      },
      data: {
        disconnectedAt: new Date(),
      },
    });
  }
}
