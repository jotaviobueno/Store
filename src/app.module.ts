import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { GraphqlModule } from './modules/graphql/graphql.module';

@Module({
  imports: [PrismaModule, GraphqlModule],
})
export class AppModule {}
