import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVacanteDto {
  @ApiProperty({ example: 'Desarrollador Full Stack Senior' })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({ 
    example: 'Buscamos un desarrollador con amplia experiencia en React, Node.js y bases de datos relacionales.' 
  })
  @IsString()
  @IsNotEmpty()
  descripcion: string;

  @ApiProperty({ example: 50000, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  salario_minimo?: number;

  @ApiProperty({ example: 80000, required: false })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  @Min(0)
  salario_maximo?: number;

  @ApiProperty({ example: 'uuid-empresa' })
  @IsUUID()
  @IsNotEmpty()
  empresaId: string;

  @ApiProperty({ example: 'uuid-modalidad' })
  @IsUUID()
  @IsNotEmpty()
  modalidadId: string;

  @ApiProperty({ example: 'uuid-horario' })
  @IsUUID()
  @IsNotEmpty()
  horarioId: string;
}
