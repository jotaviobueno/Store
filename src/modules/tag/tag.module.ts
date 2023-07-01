import { Module, forwardRef } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { TagRepository } from './tag.repository';
import { ArticleModule } from '../article/article.module';

@Module({
  imports: [forwardRef(() => ArticleModule)],
  providers: [TagResolver, TagService, TagRepository],
  exports: [TagService],
})
export class TagModule {}
