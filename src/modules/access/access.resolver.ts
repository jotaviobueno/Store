import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { AccessService } from './access.service';
import { AccessSchema, UserSchema } from 'src/domain/schemas';
import {
  CreateAccessInput,
  IdInput,
  PaginationOptionsInput,
} from 'src/domain/dtos';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './guard/auth.guard';

@Resolver(() => AccessSchema)
export class AccessResolver {
  constructor(private readonly accessService: AccessService) {}

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
  findOne(@Args('id') id: string) {
    return this.accessService.findOne(id);
  }

  @Mutation(() => Boolean)
  removeAccess(@Args('accessId') { id }: IdInput) {
    return this.accessService.remove(id);
  }
}
