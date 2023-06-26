import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserSchema } from 'src/domain/schemas';
import {
  CreateUserInput,
  IdInput,
  PaginationOptionsInput,
  UpdateUserInput,
} from 'src/domain/dtos';

@Resolver(() => UserSchema)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserSchema)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Query(() => [UserSchema], { name: 'users' })
  findAll(
    @Args('paginationOptions') paginationOptions: PaginationOptionsInput,
  ) {
    return this.userService.findAll(paginationOptions);
  }

  @Query(() => UserSchema, { name: 'user' })
  findOne(@Args('userId') { id }: IdInput) {
    return this.userService.findOne(id);
  }

  @Mutation(() => UserSchema)
  updateUser(
    @Args('userId') { id }: IdInput,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  removeUser(@Args('userId') { id }: IdInput) {
    return this.userService.remove(id);
  }
}