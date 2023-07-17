import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderInput } from 'src/domain/dtos';
import { OrderSchema } from 'src/domain/schemas';

@Injectable()
export class OrderRepository {
  constructor(private readonly prismaService: PrismaService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  create({
    cartId,
    ...createOrderInput
  }: CreateOrderInput): Promise<OrderSchema> {
    return this.prismaService.order.create({
      data: {
        ...createOrderInput,
      },
    });
  }

  findById(id: string): Promise<OrderSchema> {
    return this.prismaService.order.findFirst({
      where: {
        id,
      },
    });
  }

  update(orderId: string, stripeId: string): Promise<OrderSchema> {
    return this.prismaService.order.update({
      where: {
        id: orderId,
      },
      data: {
        stripeId,
      },
    });
  }
}
