import * as DataLoader from "dataloader";
import { Injectable, Scope } from "@nestjs/common";
import { TagSchema } from "src/domain/schemas";
import { ArticleTagService } from "./article-tag.service";
import { TagService } from "../tag/tag.service";

@Injectable({ scope: Scope.REQUEST })
export class ArticleTagLoader {
  private readonly dataLoader: DataLoader<string, TagSchema[]>;
  name = "ArticleTagLoader";

  constructor(
    private readonly articleTagService: ArticleTagService,
    private readonly tagService: TagService
  ) {
    this.dataLoader = new DataLoader<string, TagSchema[]>(
      (keys) => this.batchArticleCategory([...keys]),
      {
        cache: true
      }
    );
  }

  private async batchArticleCategory(
    articlesIds: string[]
  ): Promise<TagSchema[][]> {
    const articlesTags =
      await this.articleTagService.findManyByArticleId(articlesIds);

    const tagIds = articlesTags.map(
      (articleCategory) => articleCategory.tagId
    );

    const tags = await this.tagService.findMany(tagIds);

    const tagsMap: Record<string, TagSchema[]> = {};

    articlesIds.forEach((articleId) => {
      tags.forEach((tag) => {
        if (!tagsMap[articleId]) tagsMap[articleId] = [];

        tagsMap[articleId].push(tag);
      });
    });

    return articlesIds.map((id) => tagsMap[id]);
  }

  load(key: string): Promise<TagSchema[]> {
    return this.dataLoader.load(key);
  }
}
