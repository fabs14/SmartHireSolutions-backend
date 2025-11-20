import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateExperienciaDto {
  @ApiProperty({ description: 'Título del puesto', example: 'Frontend Developer' })
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty({ description: 'Nombre de la empresa', example: 'TechCorp' })
  @IsNotEmpty()
  @IsString()
  empresa: string;

  @ApiProperty({ description: 'Descripción de responsabilidades', example: 'Desarrollo de aplicaciones web...', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: 'Ubicación', example: 'Buenos Aires, Argentina', required: false })
  @IsOptional()
  @IsString()
  ubicacion?: string;

  @ApiProperty({ description: 'Fecha de inicio', example: '2023-01-15' })
  @IsNotEmpty()
  @IsDateString()
  fecha_comienzo: string;

  @ApiProperty({ description: 'Fecha de fin (null si es trabajo actual)', example: '2024-12-31', required: false })
  @IsOptional()
  @IsDateString()
  fecha_final?: string;
}

export class UpdateExperienciaDto {
  @ApiProperty({ description: 'Título del puesto', example: 'Senior Frontend Developer', required: false })
  @IsOptional()
  @IsString()
  titulo?: string;

  @ApiProperty({ description: 'Nombre de la empresa', example: 'TechCorp Inc', required: false })
  @IsOptional()
  @IsString()
  empresa?: string;

  @ApiProperty({ description: 'Descripción de responsabilidades', required: false })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ description: 'Ubicación', required: false })
  @IsOptional()
  @IsString()
  ubicacion?: string;

  @ApiProperty({ description: 'Fecha de inicio', required: false })
  @IsOptional()
  @IsDateString()
  fecha_comienzo?: string;

  @ApiProperty({ description: 'Fecha de fin', required: false })
  @IsOptional()
  @IsDateString()
  fecha_final?: string;
}
