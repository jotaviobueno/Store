import { Module, forwardRef } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { TagRepository } from './tag.repository';
import { ArticleModule } from '../article/article.module';
import { ArticleTagModule } from '../article-tag/article-tag.module';

@Module({
  imports: [forwardRef(() => ArticleModule), ArticleTagModule],
  providers: [TagResolver, TagService, TagRepository],
  exports: [TagService],
})
export class TagModule {}
