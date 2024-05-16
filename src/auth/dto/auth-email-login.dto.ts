import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class AuthEmailLoginDto {
  @ApiProperty({ example: 'test1@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
