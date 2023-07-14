import { Field, InputType } from '@nestjs/graphql';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

@InputType()
export class CreateChargeInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  paymentMethodId: string;

  @IsNumber()
  @Field()
  amount: number;
}
