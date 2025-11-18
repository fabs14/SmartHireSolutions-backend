import { ApiProperty } from '@nestjs/swagger';

export class Candidato {
  @ApiProperty()
  id: string;

  @ApiProperty()
  titulo: string;

  @ApiProperty({ required: false })
  bio?: string;

  @ApiProperty()
  ubicacion: string;

  @ApiProperty({ required: false })
  foto_perfil_url?: string;

  @ApiProperty()
  usuarioId: string;
}
