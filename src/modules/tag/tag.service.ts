import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import {
  CreateTagInput,
  PaginationOptionsInput,
  UpdateTagInput,
} from 'src/domain/dtos';
import { TagRepository } from './tag.repository';
import { ArticleService } from '../article/article.service';

@Injectable()
export class TagService {
  constructor(
    private readonly tagRepository: TagRepository,
    @Inject(forwardRef(() => ArticleService))
    private readonly articleService: ArticleService,
  ) {}

  async create(createTagInput: CreateTagInput) {
    return await Promise.all(
      createTagInput.name.map(async (name) => {
        const tagExist = await this.tagRepository.findByName(name);

        if (tagExist) return tagExist;

        return this.tagRepository.create(name, createTagInput);
      }),
    );
  }

  findAll(paginationOptions: PaginationOptionsInput) {
    return this.tagRepository.findAll(paginationOptions);
  }

  async findOne(id: string) {
    const tag = await this.tagRepository.findOne(id);

    if (!tag) throw new HttpException('Tag not found', HttpStatus.NOT_FOUND);

    return tag;
  }

  async update(id: string, updateTagInput: UpdateTagInput) {
    const tag = await this.findOne(id);

    const update = await this.tagRepository.update(tag.id, updateTagInput);

    if (!update)
      throw new HttpException(
        'Failed to update this tag',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return update;
  }

  async remove(id: string) {
    const tag = await this.findOne(id);

    const remove = await this.tagRepository.softDelete(tag.id);

    if (!remove)
      throw new HttpException(
        'Failed to delete this tag',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return true;
  }

  getArticle(articleId: string) {
    return this.articleService.findOne(articleId);
  }
}
