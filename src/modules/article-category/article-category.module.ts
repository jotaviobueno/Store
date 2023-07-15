import { forwardRef, Module } from "@nestjs/common";
import { ArticleCategoryService } from "./article-category.service";
import { ArticleCategoryRepository } from "./article-category.repository";
import { ArticleCategoryLoader } from "./article-category.dataloader";
import { CategoryModule } from "../category/category.module";

@Module({
  imports: [forwardRef(() => CategoryModule)],
  providers: [ArticleCategoryService, ArticleCategoryRepository, ArticleCategoryLoader],
  exports: [ArticleCategoryService, ArticleCategoryLoader]
})
export class ArticleCategoryModule {
}
