import { STOCK_ENUM } from '../../enums';
import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CreateStockInput {
  type: STOCK_ENUM;

  productId: string;

  stock: number;
}
