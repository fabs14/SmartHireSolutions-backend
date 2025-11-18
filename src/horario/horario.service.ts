import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { UpdateHorarioDto } from './dto/update-horario.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HorarioService {
  constructor(private prisma: PrismaService) {}

  create(createHorarioDto: CreateHorarioDto) {
    return this.prisma.horario.create({
      data: createHorarioDto,
    });
  }

  findAll() {
    return this.prisma.horario.findMany({
      include: {
        _count: {
          select: { vacantes: true },
        },
      },
    });
  }

  async findOne(id: string) {
    const horario = await this.prisma.horario.findUnique({
      where: { id },
    });

    if (!horario) {
      throw new NotFoundException(`Horario con ID ${id} no encontrado`);
    }

    return horario;
  }

  async update(id: string, updateHorarioDto: UpdateHorarioDto) {
    await this.findOne(id);

    return this.prisma.horario.update({
      where: { id },
      data: updateHorarioDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.horario.delete({
      where: { id },
    });
  }
}
