import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateModalidadDto } from './dto/create-modalidad.dto';
import { UpdateModalidadDto } from './dto/update-modalidad.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ModalidadService {
  constructor(private prisma: PrismaService) {}

  async create(createModalidadDto: CreateModalidadDto) {
    return this.prisma.modalidad.create({
      data: createModalidadDto,
    });
  }

  async findAll() {
    return this.prisma.modalidad.findMany({
      include: {
        _count: {
          select: { vacantes: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const modalidad = await this.prisma.modalidad.findUnique({
      where: { id },
    });

    if (!modalidad) {
      throw new NotFoundException(`Modalidad con ID ${id} no encontrada`);
    }

    return modalidad;
  }

  async update(id: string, updateModalidadDto: UpdateModalidadDto) {
    await this.findOne(id);

    return this.prisma.modalidad.update({
      where: { id },
      data: updateModalidadDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.modalidad.delete({
      where: { id },
    });
  }
}
