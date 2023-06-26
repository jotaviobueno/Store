import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAccessInput, PaginationOptionsInput } from 'src/domain/dtos';
import { AccessRepository } from './access.repository';
import { UserService } from '../user/user.service';
import { compare } from 'src/domain/utils';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AccessService {
  constructor(
    private readonly accessRepository: AccessRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async create(createAccessInput: CreateAccessInput, userAgent: string) {
    const user = await this.userService.findByEmail(createAccessInput.email);

    const passwordIsValid = await compare(
      createAccessInput.password,
      user.password,
    );

    if (!passwordIsValid)
      throw new HttpException('Password is incorrect', HttpStatus.UNAUTHORIZED);

    const accessExist = await this.accessRepository.findByUserAgent(
      user.id,
      userAgent,
    );

    const access = !accessExist
      ? await this.accessRepository.create(user.id, userAgent)
      : await this.accessRepository.update(accessExist.id);

    const payload = {
      sub: access.id,
    };

    return this.jwtService.sign(payload);
  }

  async findOne(id: string) {
    const access = await this.accessRepository.findOne(id);

    if (!access)
      throw new HttpException('Access not found', HttpStatus.FORBIDDEN);

    return access;
  }

  findAll(userId: string, paginationOptions: PaginationOptionsInput) {
    return this.accessRepository.findAll(userId, paginationOptions);
  }

  async remove(id: string) {
    const access = await this.findOne(id);

    const remove = await this.accessRepository.softDelete(access.id);

    if (!remove)
      throw new HttpException(
        'Failed to disconnect this session',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return true;
  }
}
