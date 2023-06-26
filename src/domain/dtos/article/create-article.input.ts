import { InputType, Field } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@InputType()
export class CreateArticleInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @Length(1, 1500)
  body: string;

  @Field({ nullable: true })
  @IsArray()
  @IsOptional()
  @ArrayMaxSize(5)
  imagesUrl?: string;

  @IsBoolean()
  @IsOptional()
  @Field(() => Boolean, { nullable: true })
  published?: boolean;
}
