import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStockInput } from '../../domain/dtos';
import { StockSchema } from '../../domain/schemas';
import { STOCK_ENUM } from '../../domain/enums';

@Injectable()
export class StockRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createStockInput: CreateStockInput): Promise<StockSchema> {
    return this.prismaService.stock.create({
      data: {
        ...createStockInput,
      },
    });
  }

  findByProductId(productId: string): Promise<StockSchema> {
    return this.prismaService.stock.findFirst({
      where: {
        type: STOCK_ENUM.INPUT,
        productId,
        stock: {
          gte: 0,
        },
      },
    });
  }

  findManyByProductId(productsId: string[]): Promise<StockSchema[]> {
    return this.prismaService.stock.findMany({
      where: {
        productId: {
          in: productsId,
        },
      },
    });
  }

  findAllTypeInput(productId: string): Promise<StockSchema[]> {
    return this.prismaService.stock.findMany({
      where: {
        type: STOCK_ENUM.INPUT,
        productId,
        stock: {
          gte: 0,
        },
      },
    });
  }

  update(id: string, stock: number): Promise<StockSchema> {
    return this.prismaService.stock.update({
      where: {
        id,
      },
      data: {
        stock: stock,
        updatedAt: new Date(),
      },
    });
  }
}
