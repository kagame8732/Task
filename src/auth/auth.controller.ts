import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';

@ApiTags('Auth')
@Controller({
  path: 'auth/user',
  version: '1'
})
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @HttpCode(HttpStatus.OK)
  async register(@Body() createUserDto: AuthRegisterLoginDto) {
    await this.authService.register(createUserDto);

    return {
      message: 'User created successfull!'
    };
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: AuthEmailLoginDto) {
    const result = await this.authService.login(loginDto);
    return {
      token: result.token,
      user: result.user
    };
  }
}
