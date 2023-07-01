import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateCategoryInput,
  PaginationOptionsInput,
  UpdateCategoryInput,
} from 'src/domain/dtos';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async create(createCategoryInput: CreateCategoryInput) {
    return await Promise.all(
      createCategoryInput.name.map(async (name) => {
        const tagExist = await this.categoryRepository.findByName(name);

        if (tagExist) return tagExist;

        return this.categoryRepository.create(name, createCategoryInput);
      }),
    );
  }

  findAll(paginationOptions: PaginationOptionsInput) {
    return this.categoryRepository.findAll(paginationOptions);
  }

  async findOne(id: string) {
    const category = await this.categoryRepository.findOne(id);

    if (!category)
      throw new HttpException('category not found', HttpStatus.NOT_FOUND);

    return category;
  }

  async update(id: string, updateCategoryInput: UpdateCategoryInput) {
    const category = await this.findOne(id);

    const update = await this.categoryRepository.update(
      category.id,
      updateCategoryInput,
    );

    if (!update)
      throw new HttpException(
        'Failed to update category',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return update;
  }

  async remove(id: string) {
    const category = await this.findOne(id);

    const remove = await this.categoryRepository.softDelete(category.id);

    if (!remove)
      throw new HttpException(
        'Failed to remove category',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return true;
  }
}
