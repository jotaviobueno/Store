import { Role } from '@prisma/client';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RoleSchema implements Role {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description: string | null;

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
