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
import { EducacionService } from './educacion.service';
import { CreateEducacionDto } from './dto/create-educacion.dto';
import { UpdateEducacionDto } from './dto/update-educacion.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('educacion')
@ApiBearerAuth()
@Controller('educacion')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('candidato')
export class EducacionController {
  constructor(private readonly educacionService: EducacionService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar educación' })
  @ApiResponse({ status: 201, description: 'Educación creada exitosamente' })
  create(
    @GetUser('candidato.id') candidatoId: string,
    @Body() createEducacionDto: CreateEducacionDto,
  ) {
    return this.educacionService.create(candidatoId, createEducacionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener toda mi educación' })
  @ApiResponse({ status: 200, description: 'Lista de educación' })
  findAll(@GetUser('candidato.id') candidatoId: string) {
    return this.educacionService.findAllByCandidato(candidatoId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una educación específica' })
  @ApiResponse({ status: 200, description: 'Educación encontrada' })
  @ApiResponse({ status: 404, description: 'Educación no encontrada' })
  findOne(
    @Param('id') id: string,
    @GetUser('candidato.id') candidatoId: string,
  ) {
    return this.educacionService.findOne(id, candidatoId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar educación' })
  @ApiResponse({ status: 200, description: 'Educación actualizada' })
  update(
    @Param('id') id: string,
    @GetUser('candidato.id') candidatoId: string,
    @Body() updateEducacionDto: UpdateEducacionDto,
  ) {
    return this.educacionService.update(id, candidatoId, updateEducacionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar educación' })
  @ApiResponse({ status: 200, description: 'Educación eliminada' })
  remove(
    @Param('id') id: string,
    @GetUser('candidato.id') candidatoId: string,
  ) {
    return this.educacionService.remove(id, candidatoId);
  }
}
