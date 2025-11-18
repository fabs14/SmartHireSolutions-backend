import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import OpenAI from 'openai';

@Injectable()
export class RecomendacionesService {
  private openai: OpenAI;

  constructor(private prisma: PrismaService) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  async generarRecomendacionesAsync(vacanteId: string, candidatoId: string) {
    // Ejecutar en background sin bloquear la respuesta
    setImmediate(async () => {
      try {
        await this.procesarRecomendaciones(vacanteId, candidatoId);
      } catch (error) {
        console.error(`Error generando recomendaciones para candidato ${candidatoId}:`, error);
      }
    });
  }

  private async buscarCursosPorHabilidad(nombreHabilidad: string, nivelRequerido: number) {
    // Buscar cursos en la BD que coincidan con la habilidad
    const cursos = await this.prisma.curso.findMany({
      where: {
        OR: [
          { nombre: { contains: nombreHabilidad, mode: 'insensitive' } },
          { url: { contains: nombreHabilidad, mode: 'insensitive' } },
        ],
      },
    });

    if (cursos.length === 0) return [];

    // Ordenar por cercanía al nivel requerido y tomar solo 1
    const cursoOrdenado = cursos.sort((a, b) => {
      const difA = Math.abs(a.nivel - nivelRequerido);
      const difB = Math.abs(b.nivel - nivelRequerido);
      return difA - difB;
    });

    return [cursoOrdenado[0]];
  }

  private async procesarRecomendaciones(vacanteId: string, candidatoId: string) {
    // 1. Obtener las diferencias de habilidades NEGATIVAS (las que le faltan)
    const diferencias = await this.prisma.habilidadesDiferencia.findMany({
      where: {
        vacanteId,
        candidatoId,
        diferencia: { lt: 0 }, // Solo las que están por debajo del requerido
      },
      include: {
        habilidad: true,
        vacante: {
          include: {
            empresa: true,
            habilidadesVacante: {
              include: {
                habilidad: true,
              },
            },
          },
        },
      },
    });

    if (diferencias.length === 0) {
      console.log(`Candidato ${candidatoId} no necesita recomendaciones - cumple todos los requisitos`);
      return;
    }

    // Obtener info de la vacante y empresa
    const vacante = diferencias[0].vacante;
    const nombreEmpresa = vacante.empresa.name;
    const tituloVacante = vacante.titulo;

    // OPTIMIZACION 1: Traer TODOS los cursos de una vez (1 query vs N queries)
    const todosCursos = await this.prisma.curso.findMany();

    // 2. Buscar cursos para cada habilidad en memoria
    const cursosMap = new Map<string, string[]>(); // habilidad -> cursoIds[]
    
    for (const diferencia of diferencias) {
      const nombreHabilidad = diferencia.habilidad.nombre;
      
      // Buscar el nivel requerido de la vacante para esta habilidad
      const habilidadVacante = diferencia.vacante.habilidadesVacante.find(
        hv => hv.habilidadId === diferencia.habilidadId
      );
      
      const nivelRequerido = habilidadVacante?.nivel || 5;
      
      // Filtrar cursos en memoria (sin query a BD)
      const cursosRelacionados = todosCursos.filter(curso => 
        curso.nombre.toLowerCase().includes(nombreHabilidad.toLowerCase()) ||
        (curso.url && curso.url.toLowerCase().includes(nombreHabilidad.toLowerCase()))
      );
      
      if (cursosRelacionados.length > 0) {
        // Ordenar por cercanía al nivel y tomar el mejor
        const mejorCurso = cursosRelacionados.sort((a, b) => {
          const difA = Math.abs(a.nivel - nivelRequerido);
          const difB = Math.abs(b.nivel - nivelRequerido);
          return difA - difB;
        })[0];
        
        cursosMap.set(nombreHabilidad, [mejorCurso.id]);
      }
    }

    // 3. Filtrar habilidades que tienen cursos
    const habilidadesConCursos = diferencias.filter(diferencia => {
      const nombreHabilidad = diferencia.habilidad.nombre;
      const cursosIds = cursosMap.get(nombreHabilidad) || [];
      
      if (cursosIds.length === 0) {
        console.log(`No se encontraron cursos para ${nombreHabilidad}`);
        return false;
      }
      return true;
    });

    if (habilidadesConCursos.length === 0) {
      console.log(`No hay cursos disponibles para ninguna habilidad del candidato ${candidatoId}`);
      return;
    }

    // OPTIMIZACION 2: Generar TODOS los mensajes GPT en paralelo (batch)
    const promesasGPT = habilidadesConCursos.map(async (diferencia) => {
      const nombreHabilidad = diferencia.habilidad.nombre;
      const prompt = `Genera un mensaje breve y empático para un candidato que aplica a la vacante "${tituloVacante}" en la empresa "${nombreEmpresa}".

Contexto: El candidato necesita desarrollar su habilidad en "${nombreHabilidad}" para esta posición.

El mensaje debe:
- Mencionar el nombre de la empresa y vacante
- Ser breve (máximo 80 palabras)
- Ser motivador y empático
- NO mencionar niveles, números o cursos específicos
- Usar tono profesional pero cercano

Responde SOLO con un JSON que contenga:
{
  "mensaje": "tu mensaje aquí"
}`;

      try {
        const completion = await this.openai.chat.completions.create({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'Eres un experto en desarrollo profesional. Generas mensajes motivadores y útiles.',
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.7,
        });

        const respuesta = JSON.parse(completion.choices[0].message.content || '{}');
        return { diferencia, mensaje: respuesta.mensaje };
      } catch (error) {
        console.error(`Error generando mensaje GPT para ${nombreHabilidad}:`, error);
        return null;
      }
    });

    const resultadosGPT = (await Promise.all(promesasGPT)).filter(r => r !== null);

    // 4. Crear TODAS las recomendaciones en la BD
    const recomendaciones = await Promise.all(
      resultadosGPT.map(resultado =>
        this.prisma.recomendacion.create({
          data: {
            mensaje: resultado.mensaje,
            candidatoId,
            vacanteId,
            habilidadesDiferenciaId: resultado.diferencia.id,
          },
        })
      )
    );

    // OPTIMIZACION 3: Usar createMany para vincular cursos (1 query vs N queries)
    const vinculosCursos: Array<{
      recomendacionId: string;
      cursoId: string;
      estado: string;
    }> = [];
    resultadosGPT.forEach((resultado, index) => {
      const nombreHabilidad = resultado.diferencia.habilidad.nombre;
      const cursosIds = cursosMap.get(nombreHabilidad) || [];
      const recomendacionId = recomendaciones[index].id;

      cursosIds.forEach(cursoId => {
        vinculosCursos.push({
          recomendacionId,
          cursoId,
          estado: 'pendiente',
        });
      });
    });

    if (vinculosCursos.length > 0) {
      await this.prisma.recomendacionCurso.createMany({
        data: vinculosCursos,
        skipDuplicates: true,
      });
    }

    resultadosGPT.forEach(resultado => {
      console.log(`Recomendación creada para ${resultado.diferencia.habilidad.nombre} - Candidato ${candidatoId}`);
    });

    console.log(`Todas las recomendaciones procesadas para candidato ${candidatoId}`);
  }
}
