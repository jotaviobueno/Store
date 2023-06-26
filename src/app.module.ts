import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { GraphqlModule } from './modules/graphql/graphql.module';
import { UserModule } from './modules/user/user.module';
import { AccessModule } from './modules/access/access.module';

@Module({
  imports: [PrismaModule, GraphqlModule, UserModule, AccessModule],
})
export class AppModule {}
