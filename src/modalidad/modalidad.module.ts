import { Module } from '@nestjs/common';
import { ModalidadService } from './modalidad.service';
import { ModalidadController } from './modalidad.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ModalidadController],
  providers: [ModalidadService],
  exports: [ModalidadService],
})
export class ModalidadModule {}
