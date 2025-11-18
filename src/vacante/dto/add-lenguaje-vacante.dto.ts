import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class AddLenguajeVacanteDto {
  @ApiProperty({ example: 'uuid-lenguaje' })
  @IsUUID()
  @IsNotEmpty()
  lenguajeId: string;

  @ApiProperty({ example: 8, description: 'Nivel requerido de 0 a 10' })
  @IsInt()
  @Min(0)
  @Max(10)
  nivel: number;
}
