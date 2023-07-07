import { Field, ObjectType } from '@nestjs/graphql';
import { Permission } from '@prisma/client';

@ObjectType()
export class PermissionSchema implements Permission {
  @Field()
  id: string;

  @Field()
  name: string;
}
