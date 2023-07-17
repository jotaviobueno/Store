import { Injectable } from '@nestjs/common';
import { CreateArticleTagInput } from 'src/domain/dtos';
import { ArticleTagRepository } from './article-tag.repository';

@Injectable()
export class ArticleTagService {
  constructor(private readonly articleTagRepository: ArticleTagRepository) {}

  create(createArticleTagInput: CreateArticleTagInput) {
    return this.articleTagRepository.create(createArticleTagInput);
  }

  findManyByArticleId(articleId: string[]) {
    return this.articleTagRepository.findByArticleId(articleId);
  }

  findByTagId(tagId: string) {
    return this.articleTagRepository.findByTagId(tagId);
  }
}
