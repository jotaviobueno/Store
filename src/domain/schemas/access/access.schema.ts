import { Field, ObjectType } from '@nestjs/graphql';
import { Access } from '@prisma/client';

@ObjectType()
export class AccessSchema implements Access {
  @Field()
  id: string;

  @Field()
  userAgent: string;

  @Field(() => Date)
  lastAccess: Date;

  @Field(() => Date, { nullable: true })
  disconnectedAt: Date | null;

  userId: string | null;
}
