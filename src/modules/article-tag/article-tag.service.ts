import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArticleTagInput } from 'src/domain/dtos';
import { ArticleTagRepository } from './article-tag.repository';

@Injectable()
export class ArticleTagService {
  constructor(private readonly articleTagRepository: ArticleTagRepository) {}

  create(createArticleTagInput: CreateArticleTagInput) {
    return this.articleTagRepository.create(createArticleTagInput);
  }

  async findByArticleId(articleId: string) {
    const tags = await this.articleTagRepository.findByArticleId(articleId);

    if (!tags) throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);

    return tags;
  }

  findByTagId(tagId: string) {
    return this.articleTagRepository.findByTagId(tagId);
  }
}
