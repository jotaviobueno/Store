import { Module } from "@nestjs/common";
import { TagService } from "./tag.service";
import { TagResolver } from "./tag.resolver";
import { TagRepository } from "./tag.repository";
import { ArticleTagModule } from "../article-tag/article-tag.module";
import { AccessModule } from "../access/access.module";
import { UserModule } from "../user/user.module";
import { UserRoleModule } from "../user-role/user-role.module";

@Module({
  imports: [
    ArticleTagModule,
    AccessModule,
    UserModule,
    UserRoleModule
  ],
  providers: [TagResolver, TagService, TagRepository],
  exports: [TagService]
})
export class TagModule {
}
