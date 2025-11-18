import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoriaHabilidadDto } from './dto/create-categoria-habilidad.dto';
import { UpdateCategoriaHabilidadDto } from './dto/update-categoria-habilidad.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriaHabilidadService {
  constructor(private prisma: PrismaService) {}

  create(createCategoriaHabilidadDto: CreateCategoriaHabilidadDto) {
    return this.prisma.categoriaHabilidad.create({
      data: createCategoriaHabilidadDto,
    });
  }

  findAll() {
    return this.prisma.categoriaHabilidad.findMany({
      include: {
        habilidades: true,
      },
    });
  }

  async findOne(id: string) {
    const categoria = await this.prisma.categoriaHabilidad.findUnique({
      where: { id },
      include: {
        habilidades: true,
      },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
    }

    return categoria;
  }

  async update(id: string, updateCategoriaHabilidadDto: UpdateCategoriaHabilidadDto) {
    await this.findOne(id);

    return this.prisma.categoriaHabilidad.update({
      where: { id },
      data: updateCategoriaHabilidadDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.categoriaHabilidad.delete({
      where: { id },
    });
  }
}
