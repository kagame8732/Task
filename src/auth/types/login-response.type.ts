import type { UserEntity } from '../entities/user.entity';

export type LoginResponseType = Readonly<{
  token: string;
  user: UserEntity;
}>;
