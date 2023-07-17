import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateCartInput,
  PaginationOptionsInput,
  UpdateCartInput,
} from '../../domain/dtos';
import { CartSchema } from '../../domain/schemas';

@Injectable()
export class CartRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    userId: string,
    createCartInput: CreateCartInput,
  ): Promise<CartSchema> {
    return this.prismaService.cart.create({
      data: {
        ...createCartInput,
        userId,
        deletedAt: null,
      },
    });
  }

  findAll(
    userId: string,
    { page, per_page }: PaginationOptionsInput,
  ): Promise<CartSchema[]> {
    return this.prismaService.cart.findMany({
      where: {
        userId,
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findMany(cartsIds: string[]): Promise<CartSchema[]> {
    return this.prismaService.cart.findMany({
      where: {
        id: {
          in: cartsIds,
        },
      },
    });
  }

  findById(id: string): Promise<CartSchema> {
    return this.prismaService.cart.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  update(id: string, updateCartInput: UpdateCartInput): Promise<CartSchema> {
    return this.prismaService.cart.update({
      where: {
        id,
      },
      data: {
        ...updateCartInput,
      },
    });
  }

  softDelete(id: string): Promise<CartSchema> {
    return this.prismaService.cart.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
