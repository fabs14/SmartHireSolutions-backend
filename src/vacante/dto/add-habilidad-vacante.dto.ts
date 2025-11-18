import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsInt, Min, Max, IsEnum } from 'class-validator';

export class AddHabilidadVacanteDto {
  @ApiProperty({ example: 'uuid-habilidad' })
  @IsUUID()
  @IsNotEmpty()
  habilidadId: string;

  @ApiProperty({ example: 7, description: 'Nivel requerido de 0 a 10' })
  @IsInt()
  @Min(0)
  @Max(10)
  nivel: number;

  @ApiProperty({ example: 'SI', enum: ['SI', 'NO'] })
  @IsEnum(['SI', 'NO'])
  requerido: string;
}
