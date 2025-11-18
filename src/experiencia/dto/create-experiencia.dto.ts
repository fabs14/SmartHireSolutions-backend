import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateExperienciaDto {
  @ApiProperty({
    description: 'Título del puesto',
    example: 'Senior Software Engineer',
  })
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty({
    description: 'Nombre de la empresa',
    example: 'Google',
  })
  @IsNotEmpty()
  @IsString()
  empresa: string;

  @ApiProperty({
    description: 'Fecha de inicio',
    example: '2020-01-15',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fecha_comienzo?: string;

  @ApiProperty({
    description: 'Fecha de finalización (null si es trabajo actual)',
    example: '2023-12-31',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fecha_final?: string;

  @ApiProperty({
    description: 'Ubicación del trabajo',
    example: 'Ciudad de México, México',
    required: false,
  })
  @IsOptional()
  @IsString()
  ubicacion?: string;

  @ApiProperty({
    description: 'Descripción de responsabilidades y logros',
    example: 'Desarrollo de aplicaciones web con React y Node.js',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
