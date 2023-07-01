import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TagSchema } from 'src/domain/schemas';
import {
  CreateTagInput,
  PaginationOptionsInput,
  UpdateTagInput,
} from 'src/domain/dtos';

@Injectable()
export class TagRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(name: string, createTagInput: CreateTagInput): Promise<TagSchema> {
    return this.prismaService.tag.create({
      data: {
        ...createTagInput,
        name,
        deletedAt: null,
      },
    });
  }

  findByName(name: string): Promise<TagSchema> {
    return this.prismaService.tag.findFirst({
      where: {
        name,
      },
    });
  }

  findAll({ page, per_page }: PaginationOptionsInput): Promise<TagSchema[]> {
    return this.prismaService.tag.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findOne(id: string): Promise<TagSchema> {
    return this.prismaService.tag.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  update(id: string, updateTagInput: UpdateTagInput): Promise<TagSchema> {
    return this.prismaService.tag.update({
      where: {
        id,
      },
      data: {
        ...updateTagInput,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<TagSchema> {
    return this.prismaService.tag.update({
      where: { id },
      data: { updatedAt: new Date(), deletedAt: new Date() },
    });
  }
}
