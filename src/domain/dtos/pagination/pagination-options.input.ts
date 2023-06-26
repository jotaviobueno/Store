import { InputType, Field } from '@nestjs/graphql';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

@InputType()
export class PaginationOptionsInput {
  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(0)
  page: number;

  @Field(() => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(25)
  per_page: number;

  constructor() {
    if (!this.page) this.page = 1;
    if (!this.per_page) this.per_page = 10;
  }
}
