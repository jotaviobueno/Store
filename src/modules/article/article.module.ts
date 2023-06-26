import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleResolver } from './article.resolver';
import { ArticleRepository } from './article.repository';
import { UserModule } from '../user/user.module';
import { AccessModule } from '../access/access.module';

@Module({
  imports: [UserModule, AccessModule],
  providers: [ArticleResolver, ArticleService, ArticleRepository],
  exports: [ArticleService],
})
export class ArticleModule {}
