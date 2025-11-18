import { PartialType } from '@nestjs/swagger';
import { CreateExperienciaDto } from './create-experiencia.dto';

export class UpdateExperienciaDto extends PartialType(CreateExperienciaDto) {}
