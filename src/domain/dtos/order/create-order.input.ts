import { Field, InputType } from '@nestjs/graphql';
import { ArrayNotEmpty, IsMongoId, IsNotEmpty } from 'class-validator';
import { ORDER_ENUM } from 'src/domain/enums';

@InputType()
export class CreateOrderInput {
  @IsMongoId({ each: true })
  @ArrayNotEmpty()
  @IsNotEmpty()
  @Field(() => [String])
  cartId?: string[];

  userId: string;

  productsIds: string[];

  status?: ORDER_ENUM;

  totalPrice?: number;

  quantity?: number;
}
