import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateUserInput,
  PaginationOptionsInput,
  UpdateUserInput,
} from 'src/domain/dtos';
import { UserSchema } from 'src/domain/schemas';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(createUserInput: CreateUserInput): Promise<UserSchema> {
    return this.prismaService.user.create({
      data: {
        ...createUserInput,
        deletedAt: null,
      },
    });
  }

  findOne(id: string): Promise<UserSchema> {
    return this.prismaService.user.findFirst({
      where: {
        id,
        deletedAt: null,
      },
    });
  }

  findAll({ page, per_page }: PaginationOptionsInput): Promise<UserSchema[]> {
    return this.prismaService.user.findMany({
      where: {
        deletedAt: null,
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findMany(userIds: string[]): Promise<UserSchema[]> {
    return this.prismaService.user.findMany({
      where: {
        id: {
          in: userIds,
        },
        deletedAt: null,
      },
    });
  }

  findByUsername(username: string): Promise<UserSchema> {
    return this.prismaService.user.findFirst({
      where: {
        username,
      },
    });
  }

  findByEmail(email: string): Promise<UserSchema> {
    return this.prismaService.user.findFirst({
      where: {
        email,
      },
    });
  }

  update(id: string, updateUserInput: UpdateUserInput): Promise<UserSchema> {
    return this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        ...updateUserInput,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<UserSchema> {
    return this.prismaService.user.update({
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
