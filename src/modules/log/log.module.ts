import { Global, Module } from '@nestjs/common';
import { LogService } from './log.service';
import { LogRepository } from './log.repository';

@Global()
@Module({
  providers: [LogService, LogRepository],
  exports: [LogService],
})
export class LogModule {}
