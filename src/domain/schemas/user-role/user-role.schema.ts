import { Field, ObjectType } from '@nestjs/graphql';
import { UserRole } from '@prisma/client';

@ObjectType()
export class UserRoleSchema implements UserRole {
  @Field()
  id: string;

  roleId: string;

  userId: string;

  @Field()
  createdAt: Date;
}
