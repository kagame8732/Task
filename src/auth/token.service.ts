import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  generateAccessToken(payload: any): string {
    const secret = this.configService.get<string>('AUTH_JWT_SECRET');
    const expiresIn = this.configService.get<number>(
      'AUTH_JWT_TOKEN_EXPIRES_IN'
    );
    return this.jwtService.sign(payload, { secret, expiresIn });
  }
}
