import { forwardRef, Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleResolver } from './user-role.resolver';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { UserRoleRepository } from './user-role.repository';
import { AccessModule } from '../access/access.module';

@Module({
  imports: [UserModule, forwardRef(() => RoleModule), AccessModule, UserModule],
  providers: [UserRoleResolver, UserRoleService, UserRoleRepository],
  exports: [UserRoleService],
})
export class UserRoleModule {}
