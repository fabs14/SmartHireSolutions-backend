import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LenguajeService } from './lenguaje.service';
import { CreateLenguajeDto } from './dto/create-lenguaje.dto';
import { UpdateLenguajeDto } from './dto/update-lenguaje.dto';

@ApiTags('catalogos')
@Controller('lenguajes')
export class LenguajeController {
  constructor(private readonly lenguajeService: LenguajeService) {}

  @Post()
  @ApiOperation({ summary: 'Crear idioma' })
  create(@Body() createLenguajeDto: CreateLenguajeDto) {
    return this.lenguajeService.create(createLenguajeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los idiomas' })
  findAll() {
    return this.lenguajeService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener idioma por ID' })
  findOne(@Param('id') id: string) {
    return this.lenguajeService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar idioma' })
  update(@Param('id') id: string, @Body() updateLenguajeDto: UpdateLenguajeDto) {
    return this.lenguajeService.update(id, updateLenguajeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar idioma' })
  remove(@Param('id') id: string) {
    return this.lenguajeService.remove(id);
  }
}
