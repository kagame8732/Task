import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthRegisterLoginDto } from './dto/auth-register-login.dto';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hashSync } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { Repository } from 'typeorm';
import { AuthEmailLoginDto } from './dto/auth-email-login.dto';
import { LoginResponseType } from './types/login-response.type';
import { TokenService } from './token.service';

interface ErrorResponse {
  statusCode: number;
  message: string;
}

@Injectable()
export class AuthService {
  constructor(
    private tokenService: TokenService,
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) {}

  async register(
    createUserDto: AuthRegisterLoginDto
  ): Promise<UserEntity | ErrorResponse> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email }
    });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const hashedPassword = await hashSync(createUserDto.password, 10);
    const newUser = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword
    });

    const createdUser = await this.usersRepository.save(newUser);
    return createdUser;
  }

  async login(loginDto: AuthEmailLoginDto): Promise<LoginResponseType> {
    const user = await this.usersRepository.findOne({
      where: { email: loginDto.email }
    });
    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const isMatch = await compare(
      loginDto.password,
      user.password ? user.password : ''
    );
    if (!isMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user.id, id: user.id };

    const accessToken = this.tokenService.generateAccessToken(payload);

    return {
      token: accessToken,
      user: user
    };
  }
}
