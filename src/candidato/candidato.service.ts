import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { UpdateCandidatoDto } from './dto/update-candidato.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CandidatoService {
  constructor(private prisma: PrismaService) {}

  async getProfile(candidatoId: string) {
    const candidato = await this.prisma.candidato.findUnique({
      where: { id: candidatoId },
      include: {
        usuario: {
          select: {
            name: true,
            lastname: true,
            correo: true,
            telefono: true,
            fecha_nacimiento: true,
          },
        },
        habilidadesCandidato: {
          include: {
            habilidad: {
              include: {
                categoria: true,
              },
            },
          },
          orderBy: { nivel: 'desc' },
        },
        lenguajesCandidato: {
          include: {
            lenguaje: true,
          },
          orderBy: { nivel: 'desc' },
        },
        _count: {
          select: {
            postulaciones: true,
          },
        },
      },
    });

    if (!candidato) {
      throw new NotFoundException('Candidato no encontrado');
    }

    return candidato;
  }

  async updateProfile(candidatoId: string, updateDto: UpdateCandidatoDto) {
    return this.prisma.candidato.update({
      where: { id: candidatoId },
      data: updateDto,
    });
  }

  async addHabilidad(candidatoId: string, habilidadId: string, nivel: number) {
    // Verificar que la habilidad existe
    const habilidad = await this.prisma.habilidades.findUnique({
      where: { id: habilidadId },
    });

    if (!habilidad) {
      throw new NotFoundException('Habilidad no encontrada');
    }

    return this.prisma.habilidadesCandidato.create({
      data: {
        candidatoId,
        habilidadId,
        nivel,
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

  async updateHabilidad(candidatoId: string, habilidadId: string, nivel: number) {
    return this.prisma.habilidadesCandidato.update({
      where: {
        candidatoId_habilidadId: {
          candidatoId,
          habilidadId,
        },
      },
      data: { nivel },
    });
  }

  async removeHabilidad(candidatoId: string, habilidadId: string) {
    await this.prisma.habilidadesCandidato.delete({
      where: {
        candidatoId_habilidadId: {
          candidatoId,
          habilidadId,
        },
      },
    });

    return { message: 'Habilidad eliminada del perfil' };
  }

  async addLenguaje(candidatoId: string, lenguajeId: string, nivel: number) {
    // Verificar que el lenguaje existe , mi amor porque la base esta tan laaaarga 
    const lenguaje = await this.prisma.lenguaje.findUnique({
      where: { id: lenguajeId },
    });

    if (!lenguaje) {
      throw new NotFoundException('Lenguaje no encontrado');
    }

    return this.prisma.lenguajeCandidato.create({
      data: {
        candidatoId,
        lenguajeId,
        nivel,
      },
      include: {
        lenguaje: true,
      },
    });
  }

  async updateLenguaje(candidatoId: string, lenguajeId: string, nivel: number) {
    return this.prisma.lenguajeCandidato.update({
      where: {
        candidatoId_lenguajeId: {
          candidatoId,
          lenguajeId,
        },
      },
      data: { nivel },
    });
  }

  async removeLenguaje(candidatoId: string, lenguajeId: string) {
    await this.prisma.lenguajeCandidato.delete({
      where: {
        candidatoId_lenguajeId: {
          candidatoId,
          lenguajeId,
        },
      },
    });

    return { message: 'Lenguaje eliminado del perfil' };
  }

  async searchCandidatos(filtros?: { habilidadId?: string; ubicacion?: string }) {
    const where: any = {};

    if (filtros?.ubicacion) {
      where.ubicacion = {
        contains: filtros.ubicacion,
        mode: 'insensitive',
      };
    }

    const candidatos = await this.prisma.candidato.findMany({
      where,
      include: {
        usuario: {
          select: {
            name: true,
            lastname: true,
          },
        },
        habilidadesCandidato: {
          include: {
            habilidad: true,
          },
          take: 5,
          orderBy: { nivel: 'desc' },
        },
        _count: {
          select: {
            habilidadesCandidato: true,
            lenguajesCandidato: true,
          },
        },
      },
    });

    // Si se filtra por habilidad, ordenar por candidatos que la tienen
    if (filtros?.habilidadId) {
      return candidatos.filter((c) =>
        c.habilidadesCandidato.some((h) => h.habilidadId === filtros.habilidadId),
      );
    }

    return candidatos;
  }
}
