import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { AccessService } from './access.service';
import { AccessSchema, UserSchema } from 'src/domain/schemas';
import {
  CreateAccessInput,
  IdInput,
  PaginationOptionsInput,
} from 'src/domain/dtos';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';
import { UserLoader } from '../user/user.dataloader';

@Resolver(() => AccessSchema)
export class AccessResolver {
  constructor(
    private readonly accessService: AccessService,
    private readonly userLoader: UserLoader,
  ) {}

  @Mutation(() => String)
  createAccess(
    @Args('createAccessInput') createAccessInput: CreateAccessInput,
    @Context() request: Request,
  ) {
    return this.accessService.create(
      createAccessInput,
      request.headers['user-agent'],
    );
  }

  @Query(() => [AccessSchema], { name: 'accesses' })
  @UseGuards(AuthGuard)
  findAll(
    @Context('user') { id: userId }: UserSchema,
    @Args('paginationOptions') paginationOptions: PaginationOptionsInput,
  ) {
    return this.accessService.findAll(userId, paginationOptions);
  }

  @Query(() => AccessSchema, { name: 'access' })
  findOne(@Args('accessId') { id }: IdInput) {
    return this.accessService.findOne(id);
  }

  @Mutation(() => Boolean)
  removeAccess(@Args('accessId') { id }: IdInput) {
    return this.accessService.remove(id);
  }

  @ResolveField(() => UserSchema)
  user(
    @Parent()
    { userId }: AccessSchema,
  ) {
    return this.userLoader.load(userId);
  }
}
