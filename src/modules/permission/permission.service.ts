import { Injectable } from '@nestjs/common';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  findMany(ids: string[]) {
    return this.permissionRepository.findMany(ids);
  }
}
