import type { UserEntity } from 'src/auth/entities/user.entity';

export type JwtPayloadType = Pick<UserEntity, 'id'> & {
  iat: number;
  exp: number;
};
