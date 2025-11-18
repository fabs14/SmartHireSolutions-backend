import { PartialType } from '@nestjs/swagger';
import { CreateEducacionDto } from './create-educacion.dto';

export class UpdateEducacionDto extends PartialType(CreateEducacionDto) {}
