import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleCategorySchema } from 'src/domain/schemas';
import { CreateArticleCategoryInput } from 'src/domain/dtos';

@Injectable()
export class ArticleCategoryRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createArticleCategoryInput: CreateArticleCategoryInput,
  ): Promise<ArticleCategorySchema> {
    return this.prismaService.articleCategory.create({
      data: {
        ...createArticleCategoryInput,
      },
    });
  }

  findByArticleId(articleId: string): Promise<ArticleCategorySchema[]> {
    return this.prismaService.articleCategory.findMany({
      where: {
        articleId,
      },
    });
  }

  findByCategoryId(categoryId: string): Promise<ArticleCategorySchema[]> {
    return this.prismaService.articleCategory.findMany({
      where: {
        categoryId,
      },
    });
  }
}
