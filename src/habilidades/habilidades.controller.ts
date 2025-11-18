import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HabilidadesService } from './habilidades.service';
import { CreateHabilidadeDto } from './dto/create-habilidade.dto';
import { UpdateHabilidadeDto } from './dto/update-habilidade.dto';

@ApiTags('catalogos')
@Controller('habilidades')
export class HabilidadesController {
  constructor(private readonly habilidadesService: HabilidadesService) {}

  @Post()
  @ApiOperation({ summary: 'Crear habilidad/skill' })
  @ApiResponse({ status: 201, description: 'Habilidad creada' })
  create(@Body() createHabilidadeDto: CreateHabilidadeDto) {
    return this.habilidadesService.create(createHabilidadeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las habilidades' })
  @ApiResponse({ status: 200, description: 'Lista de habilidades con categorías' })
  findAll() {
    return this.habilidadesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener habilidad por ID' })
  findOne(@Param('id') id: string) {
    return this.habilidadesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar habilidad' })
  update(@Param('id') id: string, @Body() updateHabilidadeDto: UpdateHabilidadeDto) {
    return this.habilidadesService.update(id, updateHabilidadeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar habilidad' })
  remove(@Param('id') id: string) {
    return this.habilidadesService.remove(id);
  }
}
