import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHabilidadeDto } from './dto/create-habilidade.dto';
import { UpdateHabilidadeDto } from './dto/update-habilidade.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HabilidadesService {
  constructor(private prisma: PrismaService) {}

  create(createHabilidadeDto: CreateHabilidadeDto) {
    return this.prisma.habilidades.create({
      data: createHabilidadeDto,
      include: {
        categoria: true,
      },
    });
  }

  findAll() {
    return this.prisma.habilidades.findMany({
      include: {
        categoria: true,
      },
      orderBy: {
        nombre: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const habilidad = await this.prisma.habilidades.findUnique({
      where: { id },
      include: {
        categoria: true,
      },
    });

    if (!habilidad) {
      throw new NotFoundException(`Habilidad con ID ${id} no encontrada`);
    }

    return habilidad;
  }

  async update(id: string, updateHabilidadeDto: UpdateHabilidadeDto) {
    await this.findOne(id);

    return this.prisma.habilidades.update({
      where: { id },
      data: updateHabilidadeDto,
      include: {
        categoria: true,
      },
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.habilidades.delete({
      where: { id },
    });
  }
}
