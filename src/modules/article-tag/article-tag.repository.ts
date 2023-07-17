import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleTagInput } from 'src/domain/dtos';
import { ArticleTagSchema } from 'src/domain/schemas';

@Injectable()
export class ArticleTagRepository {
  constructor(private readonly prismaService: PrismaService) {}

  create(
    createArticleTagInput: CreateArticleTagInput,
  ): Promise<ArticleTagSchema> {
    return this.prismaService.articleTag.create({
      data: {
        ...createArticleTagInput,
      },
    });
  }

  findByArticleId(articlesId: string[]): Promise<ArticleTagSchema[]> {
    return this.prismaService.articleTag.findMany({
      where: {
        articleId: {
          in: articlesId,
        },
      },
    });
  }

  findByTagId(tagId: string): Promise<ArticleTagSchema[]> {
    return this.prismaService.articleTag.findMany({
      where: {
        tagId,
      },
    });
  }
}
