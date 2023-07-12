import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLogInput } from 'src/domain/dtos';
import { LogSchema } from 'src/domain/schemas';

@Injectable()
export class LogRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createLogInput: CreateLogInput): Promise<LogSchema> {
    return this.prismaService.log.create({
      data: {
        ...createLogInput,
      },
    });
  }
}
