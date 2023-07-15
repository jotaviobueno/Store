import * as DataLoader from 'dataloader';
import { Injectable, Scope } from '@nestjs/common';
import { UserSchema } from 'src/domain/schemas';
import { UserService } from './user.service';

@Injectable({ scope: Scope.REQUEST })
export class UserLoader {
  private readonly dataLoader: DataLoader<string, UserSchema[]>;
  name = 'userLoader';

  constructor(private readonly userService: UserService) {
    this.dataLoader = new DataLoader<string, UserSchema[]>(
      (keys) => this.batchUserLoader([...keys]),
      {
        cache: true,
      },
    );
  }

  private async batchUserLoader(userIds: string[]): Promise<UserSchema[][]> {
    const users = await this.userService.findMany(userIds);

    const usersMap: Record<string, UserSchema[]> = {};

    users.forEach((user) => {
      if (!usersMap[user.id]) usersMap[user.id] = [];

      usersMap[user.id].push(user);
    });

    return userIds.map((id) => usersMap[id]);
  }

  load(key: string): Promise<UserSchema[]> {
    return this.dataLoader.load(key);
  }
}
