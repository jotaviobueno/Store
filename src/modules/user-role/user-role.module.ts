import { forwardRef, Module } from '@nestjs/common';
import { UserRoleService } from './user-role.service';
import { UserRoleResolver } from './user-role.resolver';
import { UserModule } from '../user/user.module';
import { RoleModule } from '../role/role.module';
import { UserRoleRepository } from './user-role.repository';
import { AccessModule } from '../access/access.module';
import { UserRoleDataloader } from './user-role.dataloader';

@Module({
  imports: [
    forwardRef(() => UserModule),
    forwardRef(() => RoleModule),
    AccessModule,
  ],
  providers: [
    UserRoleResolver,
    UserRoleService,
    UserRoleRepository,
    UserRoleDataloader,
  ],
  exports: [UserRoleService, UserRoleDataloader],
})
export class UserRoleModule {}
