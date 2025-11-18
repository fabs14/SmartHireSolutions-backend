import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateExperienciaDto } from './dto/create-experiencia.dto';
import { UpdateExperienciaDto } from './dto/update-experiencia.dto';

@Injectable()
export class ExperienciaService {
  constructor(private prisma: PrismaService) {}

  async create(candidatoId: string, createExperienciaDto: CreateExperienciaDto) {
    return this.prisma.experienciaCandidato.create({
      data: {
        ...createExperienciaDto,
        candidatoId,
        fecha_comienzo: createExperienciaDto.fecha_comienzo
          ? new Date(createExperienciaDto.fecha_comienzo)
          : null,
        fecha_final: createExperienciaDto.fecha_final
          ? new Date(createExperienciaDto.fecha_final)
          : null,
      },
    });
  }

  async findAllByCandidato(candidatoId: string) {
    return this.prisma.experienciaCandidato.findMany({
      where: { candidatoId },
      orderBy: { fecha_comienzo: 'desc' },
    });
  }

  async findOne(id: string, candidatoId: string) {
    const experiencia = await this.prisma.experienciaCandidato.findUnique({
      where: { id },
    });

    if (!experiencia) {
      throw new NotFoundException('Experiencia no encontrada');
    }

    if (experiencia.candidatoId !== candidatoId) {
      throw new ForbiddenException('No tienes permiso para ver esta experiencia');
    }

    return experiencia;
  }

  async update(
    id: string,
    candidatoId: string,
    updateExperienciaDto: UpdateExperienciaDto,
  ) {
    await this.findOne(id, candidatoId);

    return this.prisma.experienciaCandidato.update({
      where: { id },
      data: {
        ...updateExperienciaDto,
        fecha_comienzo: updateExperienciaDto.fecha_comienzo
          ? new Date(updateExperienciaDto.fecha_comienzo)
          : undefined,
        fecha_final: updateExperienciaDto.fecha_final
          ? new Date(updateExperienciaDto.fecha_final)
          : undefined,
      },
    });
  }

  async remove(id: string, candidatoId: string) {
    await this.findOne(id, candidatoId);

    return this.prisma.experienciaCandidato.delete({
      where: { id },
    });
  }
}
