import * as bcrypt from 'bcrypt';

export function hash(password: string, salt?: number): Promise<string> {
  return bcrypt.hash(password, salt ?? 6);
}
