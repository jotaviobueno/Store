import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AccessService } from 'src/modules/access/access.service';
import { environment } from 'src/config/environment';
import { UserService } from 'src/modules/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly accessService: AccessService,
    private readonly userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = GqlExecutionContext.create(context).getContext();
    const token = this.extractTokenFromHeader(request.headers);

    if (!token)
      throw new HttpException('invalid session', HttpStatus.BAD_REQUEST);

    try {
      const payload: { sub: string } = await this.jwtService.verifyAsync(
        token,
        {
          secret: environment.JWT_SECRET,
        },
      );

      const access = await this.accessService.findOne(payload.sub);

      request['user'] = await this.userService.findOne(access.userId);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(headers: any): string | undefined {
    if (!headers?.authorization) return undefined;

    const [type, authorization] = headers.authorization.split(' ');

    return type === 'Bearer' ? authorization : undefined;
  }
}
