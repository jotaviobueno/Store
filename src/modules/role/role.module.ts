import { forwardRef, Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleResolver } from './role.resolver';
import { RoleRepository } from './role.repository';
import { RolePermissionModule } from '../role-permission/role-permission.module';
import { AccessModule } from '../access/access.module';
import { UserModule } from '../user/user.module';
import { UserRoleModule } from '../user-role/user-role.module';

@Module({
  imports: [
    RolePermissionModule,
    AccessModule,
    UserModule,
    forwardRef(() => UserRoleModule),
  ],
  providers: [RoleResolver, RoleService, RoleRepository],
  exports: [RoleService],
})
export class RoleModule {}
