import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { AccessModule } from '../access/access.module';
import { UserRoleModule } from '../user-role/user-role.module';
import { RoleModule } from '../role/role.module';
import { UserLoader } from './user.dataloader';

@Module({
  imports: [forwardRef(() => AccessModule), UserRoleModule, RoleModule],
  providers: [UserResolver, UserService, UserRepository, UserLoader],
  exports: [UserService, UserLoader],
})
export class UserModule {}
