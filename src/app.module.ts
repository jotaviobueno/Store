import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { UserModule } from './modules/user/user.module';
import { AccessModule } from './modules/access/access.module';
import { ArticleModule } from './modules/article/article.module';
import { CategoryModule } from './modules/category/category.module';
import { TagModule } from './modules/tag/tag.module';
import { ArticleTagModule } from './modules/article-tag/article-tag.module';
import { ArticleCategoryModule } from './modules/article-category/article-category.module';

@Module({
  imports: [
    PrismaModule,
    GraphqlModule,
    UserModule,
    AccessModule,
    ArticleModule,
    CategoryModule,
    TagModule,
    ArticleTagModule,
    ArticleCategoryModule,
  ],
})
export class AppModule {}
