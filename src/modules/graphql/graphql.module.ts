import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GraphQLError } from 'graphql';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), './schema.gql'),
      fieldResolverEnhancers: ['guards'],
      formatError: (error: GraphQLError) => ({
        statusCode: (error.extensions?.exception as any)?.status,
        message:
          (error.extensions?.exception as any)?.response?.message ||
          (error?.extensions?.exception as any)?.stacktrace?.[0] ||
          (error.extensions?.response as any)?.message ||
          error?.message ||
          '-',
        error: (error.extensions?.exception as any)?.response?.error,
        code:
          (error.extensions?.exception as any)?.response?.code ||
          error.extensions?.code ||
          '-',
        meta: (error.extensions?.exception as any)?.response?.meta,
      }),
      context: ({ req, res }) => ({ req, res, headers: req.headers }),
    }),
  ],
})
export class GraphqlModule {}
