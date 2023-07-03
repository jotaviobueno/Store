import { Module } from '@nestjs/common';
import { ArticleTagService } from './article-tag.service';
import { ArticleTagRepository } from './article-tag.repository';

@Module({
  providers: [ArticleTagService, ArticleTagRepository],
  exports: [ArticleTagService],
})
export class ArticleTagModule {}
