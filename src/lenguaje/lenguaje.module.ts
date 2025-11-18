import { Module } from '@nestjs/common';
import { LenguajeService } from './lenguaje.service';
import { LenguajeController } from './lenguaje.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [LenguajeController],
  providers: [LenguajeService],
  exports: [LenguajeService],
})
export class LenguajeModule {}
