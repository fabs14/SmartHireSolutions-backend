import { IsEmail, IsString, MinLength, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'Pérez', description: 'Apellido del usuario' })
  @IsString()
  @MinLength(2)
  lastname: string;

  @ApiProperty({ example: 'juan.perez@gmail.com', description: 'Correo electrónico' })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'Password123!', description: 'Contraseña (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+52 55 1234 5678', description: 'Teléfono del usuario', required: false })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({ example: '1990-05-15', description: 'Fecha de nacimiento (YYYY-MM-DD)', required: false })
  @IsOptional()
  @IsDateString()
  fecha_nacimiento?: string;
}
