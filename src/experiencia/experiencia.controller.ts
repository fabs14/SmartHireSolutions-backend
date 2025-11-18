import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ExperienciaService } from './experiencia.service';
import { CreateExperienciaDto } from './dto/create-experiencia.dto';
import { UpdateExperienciaDto } from './dto/update-experiencia.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('experiencia')
@ApiBearerAuth()
@Controller('experiencia')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('candidato')
export class ExperienciaController {
  constructor(private readonly experienciaService: ExperienciaService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar experiencia laboral' })
  @ApiResponse({ status: 201, description: 'Experiencia creada exitosamente' })
  create(
    @GetUser('candidato.id') candidatoId: string,
    @Body() createExperienciaDto: CreateExperienciaDto,
  ) {
    return this.experienciaService.create(candidatoId, createExperienciaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas mis experiencias laborales' })
  @ApiResponse({ status: 200, description: 'Lista de experiencias' })
  findAll(@GetUser('candidato.id') candidatoId: string) {
    return this.experienciaService.findAllByCandidato(candidatoId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una experiencia específica' })
  @ApiResponse({ status: 200, description: 'Experiencia encontrada' })
  @ApiResponse({ status: 404, description: 'Experiencia no encontrada' })
  findOne(
    @Param('id') id: string,
    @GetUser('candidato.id') candidatoId: string,
  ) {
    return this.experienciaService.findOne(id, candidatoId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una experiencia' })
  @ApiResponse({ status: 200, description: 'Experiencia actualizada' })
  update(
    @Param('id') id: string,
    @GetUser('candidato.id') candidatoId: string,
    @Body() updateExperienciaDto: UpdateExperienciaDto,
  ) {
    return this.experienciaService.update(id, candidatoId, updateExperienciaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una experiencia' })
  @ApiResponse({ status: 200, description: 'Experiencia eliminada' })
  remove(
    @Param('id') id: string,
    @GetUser('candidato.id') candidatoId: string,
  ) {
    return this.experienciaService.remove(id, candidatoId);
  }
}
