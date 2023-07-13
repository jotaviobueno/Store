import { InputType, OmitType } from '@nestjs/graphql';
import { CreateCartInput } from './create-cart.input';

@InputType()
export class UpdateCartInput extends OmitType(CreateCartInput, ['productId']) {}
