import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateModalidadDto {
  @ApiProperty({ example: 'Remoto', description: 'Nombre de la modalidad de trabajo' })
  @IsString()
  @MinLength(2)
  nombre: string;
}
