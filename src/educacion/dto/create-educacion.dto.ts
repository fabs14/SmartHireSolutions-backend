import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional, IsDateString, IsIn } from 'class-validator';

export class CreateEducacionDto {
  @ApiProperty({
    description: 'Título o grado obtenido',
    example: 'Ingeniería en Sistemas Computacionales',
  })
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @ApiProperty({
    description: 'Nombre de la institución',
    example: 'Instituto Tecnológico de México',
  })
  @IsNotEmpty()
  @IsString()
  institucion: string;

  @ApiProperty({
    description: 'Fecha de inicio',
    example: '2015-08-01',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fecha_comienzo?: string;

  @ApiProperty({
    description: 'Fecha de finalización',
    example: '2019-12-15',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  fecha_final?: string;

  @ApiProperty({
    description: 'Descripción adicional',
    example: 'Especialización en desarrollo web',
    required: false,
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({
    description: 'Estado de la educación',
    example: 'COMPLETADO',
    enum: ['COMPLETADO', 'EN_CURSO', 'INCOMPLETO'],
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['COMPLETADO', 'EN_CURSO', 'INCOMPLETO'])
  estado: string;
}
