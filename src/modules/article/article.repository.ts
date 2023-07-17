import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateArticleInput,
  PaginationOptionsInput,
  SearchArticleInput,
  UpdateArticleInput,
} from 'src/domain/dtos';
import { ArticleSchema } from 'src/domain/schemas';

@Injectable()
export class ArticleRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    userId: string,
    createArticleInput: CreateArticleInput,
  ): Promise<ArticleSchema> {
    return this.prismaService.article.create({
      data: {
        ...createArticleInput,
        userId,
        deletedAt: null,
      },
    });
  }

  findAll(
    { page, per_page }: PaginationOptionsInput,
    { q }: SearchArticleInput,
  ): Promise<ArticleSchema[]> {
    if (!q)
      return this.prismaService.article.findMany({
        where: {
          deletedAt: null,
          published: true,
        },
        skip: (page - 1) * per_page,
        take: per_page,
      });

    return this.prismaService.article.findMany({
      where: {
        deletedAt: null,
        published: true,
        body: {
          contains: q,
        },
      },
      skip: (page - 1) * per_page,
      take: per_page,
    });
  }

  findMany(ids: string[]): Promise<ArticleSchema[]> {
    return this.prismaService.article.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
  }

  findOne(id: string): Promise<ArticleSchema> {
    return this.prismaService.article.findFirst({
      where: {
        id,
        deletedAt: null,
        published: true,
      },
    });
  }

  update(
    id: string,
    updateArticleInput: UpdateArticleInput,
  ): Promise<ArticleSchema> {
    return this.prismaService.article.update({
      where: {
        id,
      },
      data: {
        ...updateArticleInput,
        updatedAt: new Date(),
      },
    });
  }

  softDelete(id: string): Promise<ArticleSchema> {
    return this.prismaService.article.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        updatedAt: new Date(),
      },
    });
  }
}
