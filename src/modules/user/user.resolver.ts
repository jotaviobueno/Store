import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserSchema } from 'src/domain/schemas';
import {
  CreateUserInput,
  IdInput,
  PaginationOptionsInput,
  UpdateUserInput,
} from 'src/domain/dtos';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../access/guard/auth.guard';
import { Permissions } from '../permission/decorator/permission.decorator';
import { PERMISSION_ENUM } from '../../domain/enums';
import { RoleGuard } from '../role/guards/role.guard';

@Resolver(() => UserSchema)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => UserSchema)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(PERMISSION_ENUM.CAN_READ_USER)
  @Query(() => [UserSchema], { name: 'users' })
  findAll(
    @Args('paginationOptions') paginationOptions: PaginationOptionsInput,
  ) {
    return this.userService.findAll(paginationOptions);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(PERMISSION_ENUM.CAN_READ_USER)
  @Query(() => UserSchema, { name: 'user' })
  findOne(@Args('userId') { id }: IdInput) {
    return this.userService.findOne(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(
    PERMISSION_ENUM.CAN_UPDATE_ANY_USER,
    PERMISSION_ENUM.CAN_UPDATE_OWN_USER,
  )
  @Mutation(() => UserSchema)
  updateUser(
    @Args('userId') { id }: IdInput,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @UseGuards(AuthGuard)
  whoAmI(@Context('user') user: UserSchema) {
    return user;
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Permissions(PERMISSION_ENUM.CAN_DELETE_ANY_USER)
  @Mutation(() => Boolean)
  removeUser(@Args('userId') { id }: IdInput) {
    return this.userService.remove(id);
  }
}
