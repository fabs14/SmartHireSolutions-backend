import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEducacionDto } from './dto/create-educacion.dto';
import { UpdateEducacionDto } from './dto/update-educacion.dto';

@Injectable()
export class EducacionService {
  constructor(private prisma: PrismaService) {}

  async create(candidatoId: string, createEducacionDto: CreateEducacionDto) {
    return this.prisma.educacionCandidato.create({
      data: {
        ...createEducacionDto,
        candidatoId,
        fecha_comienzo: createEducacionDto.fecha_comienzo
          ? new Date(createEducacionDto.fecha_comienzo)
          : null,
        fecha_final: createEducacionDto.fecha_final
          ? new Date(createEducacionDto.fecha_final)
          : null,
      },
    });
  }

  async findAllByCandidato(candidatoId: string) {
    return this.prisma.educacionCandidato.findMany({
      where: { candidatoId },
      orderBy: { fecha_comienzo: 'desc' },
    });
  }

  async findOne(id: string, candidatoId: string) {
    const educacion = await this.prisma.educacionCandidato.findUnique({
      where: { id },
    });

    if (!educacion) {
      throw new NotFoundException('Educación no encontrada');
    }

    if (educacion.candidatoId !== candidatoId) {
      throw new ForbiddenException('No tienes permiso para ver esta educación');
    }

    return educacion;
  }

  async update(
    id: string,
    candidatoId: string,
    updateEducacionDto: UpdateEducacionDto,
  ) {
    await this.findOne(id, candidatoId);

    return this.prisma.educacionCandidato.update({
      where: { id },
      data: {
        ...updateEducacionDto,
        fecha_comienzo: updateEducacionDto.fecha_comienzo
          ? new Date(updateEducacionDto.fecha_comienzo)
          : undefined,
        fecha_final: updateEducacionDto.fecha_final
          ? new Date(updateEducacionDto.fecha_final)
          : undefined,
      },
    });
  }

  async remove(id: string, candidatoId: string) {
    await this.findOne(id, candidatoId);

    return this.prisma.educacionCandidato.delete({
      where: { id },
    });
  }
}
