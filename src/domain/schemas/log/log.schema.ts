import { Field, ObjectType } from '@nestjs/graphql';
import { Log, Prisma } from '@prisma/client';

@ObjectType()
export class LogSchema implements Log {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  model: string;

  @Field()
  action: string;

  oldValue: Prisma.JsonValue | null;

  newValue: Prisma.JsonValue;

  @Field(() => Date)
  createdAt: Date;
}
