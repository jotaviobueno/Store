import { Field, Float, InputType, Int } from '@nestjs/graphql';
import {
  ArrayMaxSize,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateProductInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  description: string;

  @Field(() => [String])
  @ArrayMaxSize(5)
  @IsOptional()
  imagesUrl?: string[];

  @Field(() => Float)
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @Field(() => Int)
  @IsNumber()
  @IsNotEmpty()
  stock?: number;
}
