import { IsString, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEmpresaDto {
  @ApiProperty({ example: 'Google México', description: 'Nombre de la empresa' })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ 
    example: 'Empresa líder en tecnología y servicios de internet', 
    description: 'Descripción de la empresa',
    required: false 
  })
  @IsOptional()
  @IsString()
  descripcion?: string;

  @ApiProperty({ example: 'Tecnología', description: 'Área o sector de la empresa', required: false })
  @IsOptional()
  @IsString()
  area?: string;
}
