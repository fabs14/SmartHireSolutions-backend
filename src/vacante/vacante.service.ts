import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateVacanteDto } from './dto/create-vacante.dto';
import { UpdateVacanteDto } from './dto/update-vacante.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VacanteService {
  constructor(private prisma: PrismaService) {}

  async create(createVacanteDto: CreateVacanteDto, reclutadorId: string) {
    const reclutador = await this.prisma.reclutador.findFirst({
      where: { 
        id: reclutadorId,
        empresaId: createVacanteDto.empresaId 
      },
    });

    if (!reclutador) {
      throw new ForbiddenException('No puedes crear vacantes para esta empresa');
    }

    return this.prisma.vacante.create({
      data: {
        ...createVacanteDto,
        reclutadorId,
        estado: 'ABIERTA',
      },
      include: {
        empresa: true,
        reclutador: { include: { usuario: { select: { name: true, lastname: true, correo: true } } } },
        modalidad: true,
        horario: true,
        _count: {
          select: { postulaciones: true },
        },
      },
    });
  }

  async findAll(filtros?: { estado?: string; empresaId?: string; modalidadId?: string }) {
    const where: any = {};

    if (filtros?.estado) where.estado = filtros.estado;
    if (filtros?.empresaId) where.empresaId = filtros.empresaId;
    if (filtros?.modalidadId) where.modalidadId = filtros.modalidadId;

    return this.prisma.vacante.findMany({
      where,
      include: {
        empresa: true,
        modalidad: true,
        horario: true,
        _count: {
          select: { postulaciones: true, habilidadesVacante: true },
        },
      },
      orderBy: { creado_en: 'desc' },
    });
  }

  async findOne(id: string) {
    const vacante = await this.prisma.vacante.findUnique({
      where: { id },
      include: {
        empresa: true,
        reclutador: { include: { usuario: { select: { name: true, lastname: true, correo: true } } } },
        modalidad: true,
        horario: true,
        habilidadesVacante: {
          include: { habilidad: { include: { categoria: true } } },
        },
        lenguajesVacante: {
          include: { lenguaje: true },
        },
        _count: {
          select: { postulaciones: true },
        },
      },
    });

    if (!vacante) {
      throw new NotFoundException(`Vacante con ID ${id} no encontrada`);
    }

    return vacante;
  }

  async update(id: string, updateVacanteDto: UpdateVacanteDto, reclutadorId: string) {
    const vacante = await this.prisma.vacante.findFirst({
      where: { 
        id,
        reclutadorId 
      },
    });

    if (!vacante) {
      throw new ForbiddenException('Vacante no encontrada o no tienes permiso para editarla');
    }

    return this.prisma.vacante.update({
      where: { id },
      data: updateVacanteDto,
      include: {
        empresa: true,
        modalidad: true,
        horario: true,
      },
    });
  }

  async remove(id: string, reclutadorId: string) {
    const vacante = await this.prisma.vacante.findFirst({
      where: { 
        id,
        reclutadorId 
      },
    });

    if (!vacante) {
      throw new ForbiddenException('Vacante no encontrada o no tienes permiso para eliminarla');
    }

    await this.prisma.vacante.delete({ where: { id } });
    return { message: 'Vacante eliminada exitosamente' };
  }

  async updateEstado(id: string, estado: string, reclutadorId: string) {
    const vacante = await this.prisma.vacante.findFirst({
      where: { 
        id,
        reclutadorId 
      },
    });

    if (!vacante) {
      throw new ForbiddenException('Vacante no encontrada o no tienes permiso para modificarla');
    }

    return this.prisma.vacante.update({
      where: { id },
      data: { estado },
    });
  }

  async addHabilidad(vacanteId: string, habilidadId: string, nivel: number, requerido: string, reclutadorId: string) {
    const [vacante, habilidad] = await Promise.all([
      this.prisma.vacante.findFirst({
        where: { 
          id: vacanteId,
          reclutadorId 
        },
      }),
      this.prisma.habilidades.findUnique({
        where: { id: habilidadId },
      }),
    ]);

    if (!vacante) {
      throw new ForbiddenException('Vacante no encontrada o no tienes permiso para modificarla');
    }

    if (!habilidad) {
      throw new NotFoundException(`Habilidad con ID ${habilidadId} no encontrada`);
    }

    return this.prisma.habilidadesVacante.create({
      data: {
        vacanteId,
        habilidadId,
        nivel,
        requerido,
      },
      include: {
        habilidad: {
          include: {
            categoria: true,
          },
        },
      },
    });
  }

  async removeHabilidad(vacanteId: string, habilidadId: string, reclutadorId: string) {
    const vacante = await this.prisma.vacante.findFirst({
      where: { 
        id: vacanteId,
        reclutadorId 
      },
    });

    if (!vacante) {
      throw new ForbiddenException('Vacante no encontrada o no tienes permiso para modificarla');
    }

    await this.prisma.habilidadesVacante.delete({
      where: {
        vacanteId_habilidadId: {
          vacanteId,
          habilidadId,
        },
      },
    });

    return { message: 'Habilidad eliminada de la vacante' };
  }

  async addLenguaje(vacanteId: string, lenguajeId: string, nivel: number, reclutadorId: string) {
    const [vacante, lenguaje] = await Promise.all([
      this.prisma.vacante.findFirst({
        where: { 
          id: vacanteId,
          reclutadorId 
        },
      }),
      this.prisma.lenguaje.findUnique({
        where: { id: lenguajeId },
      }),
    ]);

    if (!vacante) {
      throw new ForbiddenException('Vacante no encontrada o no tienes permiso para modificarla');
    }

    if (!lenguaje) {
      throw new NotFoundException(`Lenguaje con ID ${lenguajeId} no encontrado`);
    }

    return this.prisma.lenguajeVacante.create({
      data: {
        vacanteId,
        lenguajeId,
        nivel,
      },
      include: {
        lenguaje: true,
      },
    });
  }

  async removeLenguaje(vacanteId: string, lenguajeId: string, reclutadorId: string) {
    const vacante = await this.prisma.vacante.findFirst({
      where: { 
        id: vacanteId,
        reclutadorId 
      },
    });

    if (!vacante) {
      throw new ForbiddenException('Vacante no encontrada o no tienes permiso para modificarla');
    }

    await this.prisma.lenguajeVacante.delete({
      where: {
        vacanteId_lenguajeId: {
          vacanteId,
          lenguajeId,
        },
      },
    });

    return { message: 'Lenguaje eliminado de la vacante' };
  }
}
