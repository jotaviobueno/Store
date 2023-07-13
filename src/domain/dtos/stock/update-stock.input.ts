import { ObjectType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateStockInput } from './create-stock.input';

@ObjectType()
export class UpdateStockInput extends OmitType(PartialType(CreateStockInput), [
  'productId',
]) {}
