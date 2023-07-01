import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class UpdateTagInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}
