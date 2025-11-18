import { Module } from '@nestjs/common';
import { EducacionService } from './educacion.service';
import { EducacionController } from './educacion.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [EducacionController],
  providers: [EducacionService],
})
export class EducacionModule {}
