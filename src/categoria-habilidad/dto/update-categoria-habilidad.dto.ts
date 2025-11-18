import { PartialType } from '@nestjs/swagger';
import { CreateCategoriaHabilidadDto } from './create-categoria-habilidad.dto';

export class UpdateCategoriaHabilidadDto extends PartialType(CreateCategoriaHabilidadDto) {}
