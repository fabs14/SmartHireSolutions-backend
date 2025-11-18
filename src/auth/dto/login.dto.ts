import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'juan.perez@gmail.com', description: 'Correo electrónico' })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'Password123!', description: 'Contraseña' })
  @IsString()
  @MinLength(6)
  password: string;
}
