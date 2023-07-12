import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProductInput,
  PaginationOptionsInput,
  UpdateProductInput,
} from '../../domain/dtos';
import { ProductSchema } from '../../domain/schemas';

@Injectable()
export class ProductRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    userId: string,
    createProductInput: CreateProductInput,
  ): Promise<ProductSchema> {
    return this.prismaService.product.create({
      data: {
        userId,
        ...createProductInput,
        deletedAt: null,
      },
    });
  }

  findAll(paginationOptions: PaginationOptionsInput): Promise<ProductSchema[]> {
    return this.prismaService.product.findMany({
      where: {
        deletedAt: null,
      },
    });
  }

  findOne(id: string): Promise<ProductSchema> {
    return this.prismaService.product.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  update(
    id: string,
    updateProductInput: UpdateProductInput,
  ): Promise<ProductSchema> {
    return this.prismaService.product.update({
      where: {
        id,
      },
      data: {
        ...updateProductInput,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<ProductSchema> {
    return this.prismaService.product.update({
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
