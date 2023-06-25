import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '@prisma/client';

@ObjectType()
export class UserSchema implements User {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  username: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field({ nullable: true })
  country: string | null;

  @Field({ nullable: true })
  city: string | null;

  @Field({ nullable: true })
  state: string | null;

  @Field({ nullable: true })
  avatarUrl: string | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  deletedAt: Date | null;
}
