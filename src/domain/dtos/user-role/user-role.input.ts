import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class UserRoleInput {
  @IsMongoId()
  @IsNotEmpty()
  @Field()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  @Field()
  roleId: string;
}
