import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { LOG_TYPE } from 'src/domain/enums';
import { firstLetterToLowerCase } from 'src/domain/utils';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({ log: ['error', 'query', 'info', 'warn'] });
  }

  async onModuleInit() {
    await this.$connect();

    if (process.env.NODE_ENV === 'production')
      this.$use(async (params, next) => {
        if (params.action === 'create' && !params.runInTransaction) {
          await this.$transaction([
            this.log.create({
              data: {
                type: LOG_TYPE.BEHAVIOR,
                model: params.model,
                action: 'create',
                newValue: params.args['data'],
              },
            }),
          ]);
        }

        if (params.action === 'update' && !params.runInTransaction) {
          const model = firstLetterToLowerCase(params.model);

          await this.$transaction([
            this.log.create({
              data: {
                type: LOG_TYPE.BEHAVIOR,
                action: 'update',
                model: params.model,
                oldValue: await ((this as any)[model] as any).findUnique({
                  where: {
                    id: params.args.where.id,
                  },
                }),
                newValue: params.args['data'],
              },
            }),
          ]);
        }

        if (params.action === 'delete' && !params.runInTransaction) {
          const model = firstLetterToLowerCase(params.model);

          await this.$transaction([
            this.log.create({
              data: {
                type: LOG_TYPE.BEHAVIOR,
                action: 'delete',
                model: params.model,
                oldValue: await ((this as any)[model] as any).findUnique({
                  where: {
                    id: params.args.where.id,
                  },
                }),
                newValue: params.args['data'],
              },
            }),
          ]);
        }

        return next(params);
      });
  }

  // noinspection JSUnusedGlobalSymbols
  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
