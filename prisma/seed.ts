import { PrismaClient } from '@prisma/client';
import { roleModel } from './role.model';

const prisma = new PrismaClient();

interface Roles {
  name: string;
  permissions: string[];
}

async function main(roles: Roles[]) {
  return await prisma.$transaction(
    async (tx) => {
      for (const { name, permissions } of roles) {
        const nameAlreadyExist = await tx.role.findFirst({
          where: {
            name: name,
          },
        });

        if (nameAlreadyExist) return nameAlreadyExist;

        const role = await tx.role.create({
          data: {
            name,
          },
        });

        const permissionsCreated = await Promise.all(
          permissions.map(async (permission) => {
            const nameAlreadyExist = await tx.permission.findFirst({
              where: {
                name: permission,
              },
            });

            if (nameAlreadyExist) return nameAlreadyExist;

            return tx.permission.create({
              data: {
                name: permission,
              },
            });
          }),
        );

        await Promise.all(
          permissionsCreated.map(async (permissionCreated) => {
            const roleAlreadyThisPermission = await tx.rolePermission.findFirst(
              {
                where: {
                  permissionId: permissionCreated.id,
                  roleId: role.id,
                },
              },
            );

            if (roleAlreadyThisPermission) return roleAlreadyThisPermission;

            return tx.rolePermission.create({
              data: {
                permissionId: permissionCreated.id,
                roleId: role.id,
              },
            });
          }),
        );
      }
    },
    {
      maxWait: 5000, // default: 2000
      timeout: 550000, // default: 5000
    },
  );
}

main(roleModel)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
