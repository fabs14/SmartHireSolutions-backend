import { Controller, Get, Post, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { MatchingService } from './matching.service';

@ApiTags('matching')
@Controller('matching')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Get('vacante/:id/data')
  @Roles('reclutador', 'admin')
  @ApiOperation({ summary: 'Obtener datos de vacante y candidatos para k-means' })
  @ApiParam({ name: 'id', description: 'ID de la vacante' })
  @ApiResponse({ status: 200, description: 'Datos formateados para el microservicio de k-means' })
  @ApiResponse({ status: 404, description: 'Vacante no encontrada' })
  async getMatchingData(@Param('id') vacanteId: string) {
    return this.matchingService.getMatchingData(vacanteId);
  }

  @Post('vacante/:id/process')
  @Roles('reclutador')
  @ApiOperation({ summary: 'Procesar matching con k-means y actualizar puntuaciones' })
  @ApiParam({ name: 'id', description: 'ID de la vacante' })
  @ApiResponse({ status: 200, description: 'Matching procesado exitosamente' })
  @ApiResponse({ status: 404, description: 'Vacante no encontrada' })
  async processMatching(@Param('id') vacanteId: string) {
    return this.matchingService.processMatchingWithKMeans(vacanteId);
  }
}
