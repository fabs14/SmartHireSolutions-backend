import { IsEmail, IsString, MinLength, IsOptional, IsDateString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterReclutadorDto {
  @ApiProperty({ example: 'Carlos', description: 'Nombre del reclutador' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'López', description: 'Apellido del reclutador' })
  @IsString()
  @MinLength(2)
  lastname: string;

  @ApiProperty({ example: 'carlos.lopez@google.com', description: 'Correo electrónico corporativo' })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'Password123!', description: 'Contraseña (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+52 55 5555 1234', description: 'Teléfono', required: false })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({ example: '1988-03-10', description: 'Fecha de nacimiento (YYYY-MM-DD)', required: false })
  @IsOptional()
  @IsDateString()
  fecha_nacimiento?: string;

  // Campos específicos del reclutador
  @ApiProperty({ 
    example: '550e8400-e29b-41d4-a716-446655440000', 
    description: 'ID de la empresa (debe existir previamente)' 
  })
  @IsUUID()
  empresaId: string;

  @ApiProperty({ example: 'HR Manager', description: 'Posición en la empresa', required: false })
  @IsOptional()
  @IsString()
  posicion?: string;
}
