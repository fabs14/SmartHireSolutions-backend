import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CursosService } from './cursos.service';

@Controller('cursos')
@UseGuards(JwtAuthGuard, RolesGuard)
export class CursosController {
  constructor(private cursosService: CursosService) {}

  @Post('poblar')
  @Roles('reclutador', 'admin')
  async poblarCursos() {
    await this.cursosService.poblarCursosIniciales();
    return {
      message: 'Cursos poblados exitosamente',
      success: true,
    };
  }
}
