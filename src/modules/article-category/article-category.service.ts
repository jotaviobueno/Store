import { Injectable } from "@nestjs/common";
import { CreateArticleCategoryInput } from "src/domain/dtos";
import { ArticleCategoryRepository } from "./article-category.repository";

@Injectable()
export class ArticleCategoryService {
  constructor(
    private readonly articleCategoryRepository: ArticleCategoryRepository
  ) {
  }

  create(createArticleCategoryInput: CreateArticleCategoryInput) {
    return this.articleCategoryRepository.create(createArticleCategoryInput);
  }

  findManyByArticleId(articlesId: string[]) {
    return this.articleCategoryRepository.findManyByArticleId(
      articlesId
    );

  }
}
