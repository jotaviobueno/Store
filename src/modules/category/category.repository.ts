import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCategoryInput,
  PaginationOptionsInput,
  UpdateCategoryInput,
} from 'src/domain/dtos';
import { CategorySchema } from 'src/domain/schemas';

@Injectable()
export class CategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    name: string,
    createCategoryInput: CreateCategoryInput,
  ): Promise<CategorySchema> {
    return this.prismaService.category.create({
      data: {
        ...createCategoryInput,
        name,
        deletedAt: null,
      },
    });
  }

  findByName(name: string): Promise<CategorySchema> {
    return this.prismaService.category.findFirst({
      where: {
        name,
      },
    });
  }

  findAll({
    page,
    per_page,
  }: PaginationOptionsInput): Promise<CategorySchema[]> {
    return this.prismaService.category.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findOne(id: string): Promise<CategorySchema> {
    return this.prismaService.category.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  update(
    id: string,
    updateCategoryInput: UpdateCategoryInput,
  ): Promise<CategorySchema> {
    return this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        ...updateCategoryInput,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<CategorySchema> {
    return this.prismaService.category.update({
      where: {
        id,
      },
      data: {
        updatedAt: new Date(),
        deletedAt: new Date(),
      },
    });
  }
}
