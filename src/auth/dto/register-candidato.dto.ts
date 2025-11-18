import { IsEmail, IsString, MinLength, IsOptional, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterCandidatoDto {
  @ApiProperty({ example: 'María', description: 'Nombre del candidato' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 'García', description: 'Apellido del candidato' })
  @IsString()
  @MinLength(2)
  lastname: string;

  @ApiProperty({ example: 'maria.garcia@gmail.com', description: 'Correo electrónico' })
  @IsEmail()
  correo: string;

  @ApiProperty({ example: 'Password123!', description: 'Contraseña (mínimo 6 caracteres)' })
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: '+52 55 9876 5432', description: 'Teléfono', required: false })
  @IsOptional()
  @IsString()
  telefono?: string;

  @ApiProperty({ example: '1995-08-20', description: 'Fecha de nacimiento (YYYY-MM-DD)', required: false })
  @IsOptional()
  @IsDateString()
  fecha_nacimiento?: string;

  // Campos específicos del candidato
  @ApiProperty({ example: 'Full Stack Developer', description: 'Título profesional', required: false })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({ 
    example: '5 años de experiencia en desarrollo web con React y Node.js', 
    description: 'Biografía profesional',
    required: false 
  })
  @IsOptional()
  @IsString()
  bio?: string;

  @ApiProperty({ example: 'Ciudad de México, CDMX', description: 'Ubicación', required: false })
  @IsOptional()
  @IsString()
  ubicacion?: string;
}
