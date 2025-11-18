import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CategoriaHabilidadService } from './categoria-habilidad.service';
import { CreateCategoriaHabilidadDto } from './dto/create-categoria-habilidad.dto';
import { UpdateCategoriaHabilidadDto } from './dto/update-categoria-habilidad.dto';

@ApiTags('catalogos')
@Controller('categorias-habilidad')
export class CategoriaHabilidadController {
  constructor(private readonly categoriaHabilidadService: CategoriaHabilidadService) {}

  @Post()
  @ApiOperation({ summary: 'Crear categoría de habilidades' })
  create(@Body() createCategoriaHabilidadDto: CreateCategoriaHabilidadDto) {
    return this.categoriaHabilidadService.create(createCategoriaHabilidadDto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar categorías con sus habilidades' })
  findAll() {
    return this.categoriaHabilidadService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener categoría por ID' })
  findOne(@Param('id') id: string) {
    return this.categoriaHabilidadService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar categoría' })
  update(@Param('id') id: string, @Body() updateCategoriaHabilidadDto: UpdateCategoriaHabilidadDto) {
    return this.categoriaHabilidadService.update(id, updateCategoriaHabilidadDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar categoría' })
  remove(@Param('id') id: string) {
    return this.categoriaHabilidadService.remove(id);
  }
}
