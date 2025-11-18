import {
  Injectable,
  NotFoundException,
  ConflictException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostulacionDto } from './dto/create-postulacion.dto';

@Injectable()
export class PostulacionService {
  constructor(private prisma: PrismaService) {}

  async create(candidatoId: string, createPostulacionDto: CreatePostulacionDto) {
    const { vacanteId } = createPostulacionDto;

    // Verificar vacante existe/activa y postulación existente en paralelo
    const [vacante, existingPostulacion] = await Promise.all([
      this.prisma.vacante.findUnique({
        where: { id: vacanteId },
      }),
      this.prisma.postulacion.findUnique({
        where: {
          candidatoId_vacanteId: {
            candidatoId,
            vacanteId,
          },
        },
      }),
    ]);

    if (!vacante) {
      throw new NotFoundException('Vacante no encontrada');
    }

    if (vacante.estado === 'CERRADA') {
      throw new ConflictException('La vacante está cerrada');
    }

    if (existingPostulacion) {
      throw new ConflictException('Ya te has postulado a esta vacante');
    }

    // Crear la postulación (la compatibilidad se calculará con k-means)
    return this.prisma.postulacion.create({
      data: {
        candidatoId,
        vacanteId,
      },
      include: {
        vacante: {
          include: {
            empresa: true,
            modalidad: true,
            horario: true,
          },
        },
      },
    });
  }

  async findAllByCandidato(candidatoId: string) {
    return this.prisma.postulacion.findMany({
      where: { candidatoId },
      include: {
        vacante: {
          include: {
            empresa: true,
            modalidad: true,
            horario: true,
          },
        },
      },
      orderBy: {
        creado_en: 'desc',
      },
    });
  }

  async findAllByVacante(vacanteId: string, reclutadorId: string) {
    // Verificar que la vacante pertenece al reclutador
    const vacante = await this.prisma.vacante.findFirst({
      where: {
        id: vacanteId,
        reclutadorId,
      },
    });

    if (!vacante) {
      throw new ForbiddenException(
        'No tienes permiso para ver las postulaciones de esta vacante',
      );
    }

    return this.prisma.postulacion.findMany({
      where: { vacanteId },
      include: {
        candidato: {
          include: {
            usuario: {
              select: {
                name: true,
                lastname: true,
                correo: true,
                telefono: true,
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
            },
            lenguajesCandidato: {
              include: {
                lenguaje: true,
              },
            },
          },
        },
      },
      orderBy: {
        puntuacion_compatibilidad: 'desc',
      },
    });
  }

  async findOne(id: string, usuarioId: string, role: string) {
    const postulacion = await this.prisma.postulacion.findUnique({
      where: { id },
      include: {
        candidato: {
          include: {
            usuario: true,
          },
        },
        vacante: {
          include: {
            empresa: true,
            reclutador: true,
          },
        },
      },
    });

    if (!postulacion) {
      throw new NotFoundException('Postulación no encontrada');
    }

    // Verificar permisos
    if (role === 'candidato' && postulacion.candidato.usuarioId !== usuarioId) {
      throw new ForbiddenException('No tienes permiso para ver esta postulación');
    }

    if (
      role === 'reclutador' &&
      postulacion.vacante.reclutador.usuarioId !== usuarioId
    ) {
      throw new ForbiddenException('No tienes permiso para ver esta postulación');
    }

    return postulacion;
  }

  async remove(id: string, candidatoId: string) {
    const postulacion = await this.prisma.postulacion.findUnique({
      where: { id },
    });

    if (!postulacion) {
      throw new NotFoundException('Postulación no encontrada');
    }

    if (postulacion.candidatoId !== candidatoId) {
      throw new ForbiddenException('No tienes permiso para eliminar esta postulación');
    }

    return this.prisma.postulacion.delete({
      where: { id },
    });
  }
}
