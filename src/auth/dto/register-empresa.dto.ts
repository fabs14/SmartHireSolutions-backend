import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MinLength, IsOptional } from 'class-validator';

export class RegisterEmpresaDto {
  // Datos de la empresa
  @ApiProperty({
    description: 'Nombre de la empresa',
    example: 'TechCorp Solutions',
  })
  @IsNotEmpty()
  @IsString()
  nombreEmpresa: string;

  @ApiProperty({
    description: 'Descripción de la empresa',
    example: 'Empresa líder en desarrollo de software',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcionEmpresa?: string;

  @ApiProperty({
    description: 'Área o industria de la empresa',
    example: 'Tecnología',
    required: false,
  })
  @IsOptional()
  @IsString()
  areaEmpresa?: string;

  // Datos del usuario administrador
  @ApiProperty({
    description: 'Nombre del administrador',
    example: 'Carlos',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Apellido del administrador',
    example: 'López',
  })
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty({
    description: 'Correo electrónico del administrador',
    example: 'carlos@techcorp.com',
  })
  @IsNotEmpty()
  @IsEmail()
  correo: string;

  @ApiProperty({
    description: 'Contraseña',
    example: '123456',
    minLength: 6,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({
    description: 'Teléfono del administrador',
    example: '+52-555-1234',
    required: false,
  })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({
    description: 'Posición/cargo del administrador',
    example: 'HR Manager',
    required: false,
  })
  @IsOptional()
  @IsString()
  posicion?: string;
}
