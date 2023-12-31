import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType()
export class SearchArticleInput {
  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  q?: string;
}
