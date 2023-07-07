import { Module } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';
import { RolePermissionRepository } from './role-permission.repository';
import { PermissionModule } from '../permission/permission.module';

@Module({
  imports: [PermissionModule],
  providers: [RolePermissionService, RolePermissionRepository],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
