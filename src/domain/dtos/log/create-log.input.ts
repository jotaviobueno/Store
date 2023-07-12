import { Prisma } from '@prisma/client';

export class CreateLogInput {
  type: string;

  model: string;

  action: string;

  oldValue?: Prisma.JsonValue | null;

  newValue: Prisma.JsonValue;
}
