import { ApiProperty } from '@nestjs/swagger';

export class Vacante {
  @ApiProperty()
  id: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty()
  descripcion: string;

  @ApiProperty({ required: false })
  salario_minimo?: number;

  @ApiProperty({ required: false })
  salario_maximo?: number;

  @ApiProperty()
  creado_en: Date;

  @ApiProperty()
  estado: string;

  @ApiProperty()
  empresaId: string;

  @ApiProperty()
  reclutadorId: string;

  @ApiProperty()
  modalidadId: string;

  @ApiProperty()
  horarioId: string;
}
