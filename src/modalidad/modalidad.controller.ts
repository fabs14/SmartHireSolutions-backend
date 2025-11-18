import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ModalidadService } from './modalidad.service';
import { CreateModalidadDto } from './dto/create-modalidad.dto';
import { UpdateModalidadDto } from './dto/update-modalidad.dto';

@ApiTags('catalogos')
@Controller('modalidades')
export class ModalidadController {
  constructor(private readonly modalidadService: ModalidadService) {}

  @Post()
  @ApiOperation({ summary: 'Crear modalidad de trabajo' })
  @ApiResponse({ status: 201, description: 'Modalidad creada' })
  create(@Body() createModalidadDto: CreateModalidadDto) {
    return this.modalidadService.create(createModalidadDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas las modalidades' })
  @ApiResponse({ status: 200, description: 'Lista de modalidades' })
  findAll() {
    return this.modalidadService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener modalidad por ID' })
  @ApiResponse({ status: 200, description: 'Modalidad encontrada' })
  @ApiResponse({ status: 404, description: 'Modalidad no encontrada' })
  findOne(@Param('id') id: string) {
    return this.modalidadService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar modalidad' })
  @ApiResponse({ status: 200, description: 'Modalidad actualizada' })
  update(@Param('id') id: string, @Body() updateModalidadDto: UpdateModalidadDto) {
    return this.modalidadService.update(id, updateModalidadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar modalidad' })
  @ApiResponse({ status: 200, description: 'Modalidad eliminada' })
  remove(@Param('id') id: string) {
    return this.modalidadService.remove(id);
  }
}
