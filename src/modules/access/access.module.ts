import { forwardRef, Module } from '@nestjs/common';
import { AccessService } from './access.service';
import { AccessResolver } from './access.resolver';
import { AccessRepository } from './access.repository';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { environment } from 'src/config/environment';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [
    forwardRef(() => UserModule),
    JwtModule.register({
      global: true,
      secret: environment.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [AccessResolver, AccessService, AccessRepository, AuthGuard],
  exports: [AccessService],
})
export class AccessModule {}
