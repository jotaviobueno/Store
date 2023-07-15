import * as DataLoader from "dataloader";
import { Injectable, Scope } from "@nestjs/common";
import { RoleSchema } from "src/domain/schemas";
import { UserRoleService } from "./user-role.service";
import { RoleService } from "../role/role.service";

@Injectable({ scope: Scope.REQUEST })
export class UserRoleDataloader {
  private readonly dataLoader: DataLoader<string, RoleSchema[]>;
  name = "UserRoleDataloader";

  constructor(
    private readonly userRoleService: UserRoleService,
    private readonly roleService: RoleService
  ) {
    this.dataLoader = new DataLoader<string, RoleSchema[]>(
      (keys) => this.batchUserRole([...keys]),
      {
        cache: true
      }
    );
  }

  private async batchUserRole(
    usersId: string[]
  ): Promise<RoleSchema[][]> {
    const usersRoles =
      await this.userRoleService.findManyByUsersId(usersId);

    const rolesIds = usersRoles.map(
      (userRole) => userRole.roleId
    );

    const roles = await this.roleService.findMany(rolesIds);

    const roleMap: Record<string, RoleSchema[]> = {};

    usersId.forEach((userId) => {
      roles.forEach((role) => {
        if (!roleMap[userId]) roleMap[userId] = [];

        roleMap[userId].push(role);
      });
    });

    return usersId.map((id) => roleMap[id]);
  }

  load(key: string): Promise<RoleSchema[]> {
    return this.dataLoader.load(key);
  }
}
