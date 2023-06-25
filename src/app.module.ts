import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [PrismaModule, GraphqlModule, UserModule],
})
export class AppModule {}
