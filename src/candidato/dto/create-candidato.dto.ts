import { ApiProperty } from '@nestjs/swagger';
import { IsUUID, IsNotEmpty, IsInt, Min, Max } from 'class-validator';

export class AddHabilidadCandidatoDto {
  @ApiProperty({ example: 'uuid-habilidad' })
  @IsUUID()
  @IsNotEmpty()
  habilidadId: string;

  @ApiProperty({ example: 7, description: 'Nivel de dominio de 0 a 10' })
  @IsInt()
  @Min(0)
  @Max(10)
  nivel: number;
}

export class AddLenguajeCandidatoDto {
  @ApiProperty({ example: 'uuid-lenguaje' })
  @IsUUID()
  @IsNotEmpty()
  lenguajeId: string;

  @ApiProperty({ example: 8, description: 'Nivel de dominio de 0 a 10' })
  @IsInt()
  @Min(0)
  @Max(10)
  nivel: number;
}
