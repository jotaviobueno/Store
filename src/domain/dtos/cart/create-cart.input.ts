import { Field, InputType, Int } from '@nestjs/graphql';
import { IsMongoId, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

@InputType()
export class CreateCartInput {
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  @Max(99999)
  @Field(() => Int)
  quantity: number;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  productId: string;
}
