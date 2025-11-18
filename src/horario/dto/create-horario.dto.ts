import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHorarioDto {
  @ApiProperty({ example: 'Tiempo completo', description: 'Tipo de horario de trabajo' })
  @IsString()
  @MinLength(2)
  nombre: string;
}
