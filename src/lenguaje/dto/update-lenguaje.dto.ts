import { PartialType } from '@nestjs/swagger';
import { CreateLenguajeDto } from './create-lenguaje.dto';

export class UpdateLenguajeDto extends PartialType(CreateLenguajeDto) {}
