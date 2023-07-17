import { forwardRef, Module } from '@nestjs/common';
import { ArticleTagService } from './article-tag.service';
import { ArticleTagRepository } from './article-tag.repository';
import { ArticleTagLoader } from './article-tag.dataloader';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [forwardRef(() => TagModule)],
  providers: [ArticleTagService, ArticleTagRepository, ArticleTagLoader],
  exports: [ArticleTagService, ArticleTagLoader],
})
export class ArticleTagModule {}
