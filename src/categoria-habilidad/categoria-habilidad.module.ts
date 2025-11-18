import { Module } from '@nestjs/common';
import { CategoriaHabilidadService } from './categoria-habilidad.service';
import { CategoriaHabilidadController } from './categoria-habilidad.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CategoriaHabilidadController],
  providers: [CategoriaHabilidadService],
  exports: [CategoriaHabilidadService],
})
export class CategoriaHabilidadModule {}
