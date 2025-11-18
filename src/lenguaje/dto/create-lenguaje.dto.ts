import { IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLenguajeDto {
  @ApiProperty({ example: 'Inglés', description: 'Nombre del idioma' })
  @IsString()
  @MinLength(2)
  nombre: string;
}
