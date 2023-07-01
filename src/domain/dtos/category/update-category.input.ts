import { IsNotEmpty, IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateCategoryInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}
