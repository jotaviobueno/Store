import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { UserRepository } from './user.repository';
import { AccessModule } from '../access/access.module';
import { UserRoleModule } from '../user-role/user-role.module';
import { RoleModule } from '../role/role.module';
import { StripeModule } from '../stripe/stripe.module';

@Module({
  imports: [
    forwardRef(() => AccessModule),
    UserRoleModule,
    RoleModule,
    StripeModule,
  ],
  providers: [UserResolver, UserService, UserRepository],
  exports: [UserService],
})
export class UserModule {}
