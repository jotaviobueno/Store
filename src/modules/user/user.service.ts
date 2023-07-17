import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  CreateUserInput,
  PaginationOptionsInput,
  UpdateUserInput,
} from 'src/domain/dtos';
import { UserRepository } from './user.repository';
import { hash } from 'src/domain/utils';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserInput: CreateUserInput) {
    const usernameExist = await this.userRepository.findByUsername(
      createUserInput.username,
    );

    if (usernameExist)
      throw new HttpException('Username already exists', HttpStatus.CONFLICT);

    const emailExist = await this.userRepository.findByEmail(
      createUserInput.email,
    );

    if (emailExist)
      throw new HttpException('Email already exists', HttpStatus.CONFLICT);

    const user = await this.userRepository.create({
      ...createUserInput,
      password: await hash(createUserInput.password),
    });

    return user;
  }

  findAll(paginationOptions: PaginationOptionsInput) {
    return this.userRepository.findAll(paginationOptions);
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne(id);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    return user;
  }

  async update(id: string, updateUserInput: UpdateUserInput) {
    const user = await this.findOne(id);

    const update = await this.userRepository.update(user.id, updateUserInput);

    if (!update)
      throw new HttpException(
        'Failed to update your account',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return update;
  }

  async remove(id: string) {
    const user = await this.findOne(id);

    const remove = await this.userRepository.softDelete(user.id);

    if (!remove)
      throw new HttpException(
        'Failed to delete your account',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return true;
  }
}
