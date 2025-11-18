import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmpresaModule } from './empresa/empresa.module';
import { ModalidadModule } from './modalidad/modalidad.module';
import { HorarioModule } from './horario/horario.module';
import { HabilidadesModule } from './habilidades/habilidades.module';
import { LenguajeModule } from './lenguaje/lenguaje.module';
import { CategoriaHabilidadModule } from './categoria-habilidad/categoria-habilidad.module';
import { VacanteModule } from './vacante/vacante.module';
import { CandidatoModule } from './candidato/candidato.module';
import { PostulacionModule } from './postulacion/postulacion.module';
import { ExperienciaModule } from './experiencia/experiencia.module';
import { EducacionModule } from './educacion/educacion.module';

@Module({
  imports: [
    // Cargar variables de entorno (DATABASE_URL, etc.)
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Prisma disponible en toda la aplicación
    PrismaModule,
    
    // Módulo de autenticación
    AuthModule,
    
    EmpresaModule,
    
    ModalidadModule,
    
    HorarioModule,
    
    HabilidadesModule,
    
    LenguajeModule,
    
    CategoriaHabilidadModule,
    
    VacanteModule,
    
    CandidatoModule,
    
    PostulacionModule,
    
    ExperienciaModule,
    
    EducacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
