import { InputType, OmitType, PartialType } from '@nestjs/graphql';
import { CreateCartInput } from './create-cart.input';

@InputType()
export class UpdateCartInput extends OmitType(PartialType(CreateCartInput), [
  'productId',
]) {}
