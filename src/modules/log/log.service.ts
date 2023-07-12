import { Injectable } from '@nestjs/common';
import { LogRepository } from './log.repository';
import { CreateLogInput } from 'src/domain/dtos';

@Injectable()
export class LogService {
  constructor(private readonly logRepository: LogRepository) {}

  create(createLogInput: CreateLogInput) {
    return this.logRepository.create(createLogInput);
  }
}
