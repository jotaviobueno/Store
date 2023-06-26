import { Field, InputType } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

@InputType()
export class IdInput {
  @IsMongoId()
  @IsNotEmpty()
  @Field()
  id: string;
}
