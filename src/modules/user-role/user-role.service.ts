import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRoleRepository } from './user-role.repository';
import { UserRoleInput } from '../../domain/dtos';
import { UserService } from '../user/user.service';
import { RoleService } from '../role/role.service';

@Injectable()
export class UserRoleService {
  constructor(
    private readonly userRoleRepository: UserRoleRepository,
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  async create(userRoleInput: UserRoleInput) {
    await this.roleService.findOne(userRoleInput.roleId);

    await this.userService.findOne(userRoleInput.userId);

    const userAlreadyThisRole =
      await this.userRoleRepository.findByUserIdAndRoleId(userRoleInput);

    if (userAlreadyThisRole)
      throw new HttpException('User already this role', HttpStatus.BAD_REQUEST);

    return this.userRoleRepository.create(userRoleInput);
  }

  async remove(userRoleInput: UserRoleInput) {
    await this.roleService.findOne(userRoleInput.roleId);

    await this.userService.findOne(userRoleInput.userId);

    const userReallyHasThisRole =
      await this.userRoleRepository.findByUserIdAndRoleId(userRoleInput);

    if (!userReallyHasThisRole)
      throw new HttpException(
        'this user not in this role',
        HttpStatus.BAD_REQUEST,
      );

    const destroy = await this.userRoleRepository.destroy(
      userReallyHasThisRole.id,
    );

    if (!destroy)
      throw new HttpException(
        'failed to remove in role',
        HttpStatus.NOT_ACCEPTABLE,
      );

    return true;
  }

  findAllUserRoleWithUserId(userId: string) {
    return this.userRoleRepository.findAllUserRoleWithUserId(userId);
  }

  findManyByUsersId(usersId: string[]) {
    return this.userRoleRepository.findManyByUsersId(usersId);
  }
}
