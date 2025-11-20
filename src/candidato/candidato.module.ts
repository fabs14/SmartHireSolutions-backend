import { Module } from '@nestjs/common';
import { CandidatoService } from './candidato.service';
import { CandidatoController } from './candidato.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [PrismaModule, S3Module],
  controllers: [CandidatoController],
  providers: [CandidatoService],
  exports: [CandidatoService],
})
export class CandidatoModule {}
