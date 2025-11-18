import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaHabilidadDto {
  @ApiProperty({ example: 'Frontend', description: 'Nombre de la categoría de habilidades' })
  @IsString()
  @MinLength(2)
  nombre: string;
}
