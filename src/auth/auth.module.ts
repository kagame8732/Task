import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Module({
  imports: [JwtModule.register({}), TypeOrmModule.forFeature([UserEntity])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, TokenService],
  exports: [AuthService]
})
export class AuthModule {}
