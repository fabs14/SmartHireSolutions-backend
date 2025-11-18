import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { RecomendacionesService } from './recomendaciones.service';
import { CursosService } from './cursos.service';
import { CursosController } from './cursos.controller';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [MatchingController, CursosController],
  providers: [MatchingService, RecomendacionesService, CursosService],
})
export class MatchingModule {}

