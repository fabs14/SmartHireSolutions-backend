import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HorarioService } from './horario.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@ApiTags('catalogos')
@Controller('horarios')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}

  @Post()
  @ApiOperation({ summary: 'Crear tipo de horario' })
  create(@Body() createHorarioDto: CreateHorarioDto) {
    return this.horarioService.create(createHorarioDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los horarios' })
  findAll() {
    return this.horarioService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener horario por ID' })
  findOne(@Param('id') id: string) {
    return this.horarioService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar horario' })
  update(@Param('id') id: string, @Body() updateHorarioDto: UpdateHorarioDto) {
    return this.horarioService.update(id, updateHorarioDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar horario' })
  remove(@Param('id') id: string) {
    return this.horarioService.remove(id);
  }
}
