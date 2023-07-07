import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { PaginationOptionsInput } from '../../domain/dtos';
import { RolePermissionService } from '../role-permission/role-permission.service';

@Injectable()
export class RoleService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly rolePermissionService: RolePermissionService,
  ) {}

  findAll(paginationOptions: PaginationOptionsInput) {
    return this.roleRepository.findAll(paginationOptions);
  }

  async findOne(id: string) {
    const role = await this.roleRepository.findOne(id);

    if (!role) throw new HttpException('role not found', HttpStatus.NOT_FOUND);

    return role;
  }

  getPermission(roleId: string) {
    return this.rolePermissionService.handle(roleId);
  }
}
