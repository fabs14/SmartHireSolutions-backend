import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';

export class CreateEducacionDto {
  @ApiProperty({ description: 'Título o carrera', example: 'Ingeniería en Sistemas' })
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty({ description: 'Nombre de la institución', example: 'Universidad Nacional' })
  @IsNotEmpty()
  @IsString()
  institucion: string;

  @ApiProperty({ description: 'Descripción adicional', example: 'Especialización en desarrollo web', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: 'Estado de la educación', enum: ['COMPLETADO', 'EN_CURSO', 'INCOMPLETO'], example: 'EN_CURSO' })
  @IsNotEmpty()
  @IsEnum(['COMPLETADO', 'EN_CURSO', 'INCOMPLETO'])
  estado: string;

  @ApiProperty({ description: 'Fecha de inicio', example: '2020-03-01' })
  @IsNotEmpty()
  @IsDateString()
  fecha_comienzo: string;

  @ApiProperty({ description: 'Fecha de fin (null si está en curso)', example: '2024-12-15', required: false })
  @IsOptional()
  @IsDateString()
  fecha_final?: string;
}

export class UpdateEducacionDto {
  @ApiProperty({ description: 'Título o carrera', required: false })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({ description: 'Nombre de la institución', required: false })
  @IsOptional()
  @IsString()
  institucion?: string;

  @ApiProperty({ description: 'Descripción adicional', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: 'Estado de la educación', enum: ['COMPLETADO', 'EN_CURSO', 'INCOMPLETO'], required: false })
  @IsOptional()
  @IsEnum(['COMPLETADO', 'EN_CURSO', 'INCOMPLETO'])
  estado?: string;

  @ApiProperty({ description: 'Fecha de inicio', required: false })
  @IsOptional()
  @IsDateString()
  fecha_comienzo?: string;

  @ApiProperty({ description: 'Fecha de fin', required: false })
  @IsOptional()
  @IsDateString()
  fecha_final?: string;
}
