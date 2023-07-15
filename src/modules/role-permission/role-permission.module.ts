import { Module } from "@nestjs/common";
import { RolePermissionService } from "./role-permission.service";
import { RolePermissionRepository } from "./role-permission.repository";
import { PermissionModule } from "../permission/permission.module";
import { RolePermissionLoader } from "./role-permission.dataloader";

@Module({
  imports: [PermissionModule],
  providers: [RolePermissionService, RolePermissionRepository, RolePermissionLoader],
  exports: [RolePermissionService, RolePermissionLoader]
})
export class RolePermissionModule {
}
