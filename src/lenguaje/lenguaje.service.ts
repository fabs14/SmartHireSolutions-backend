import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLenguajeDto } from './dto/create-lenguaje.dto';
import { UpdateLenguajeDto } from './dto/update-lenguaje.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LenguajeService {
  constructor(private prisma: PrismaService) {}

  create(createLenguajeDto: CreateLenguajeDto) {
    return this.prisma.lenguaje.create({
      data: createLenguajeDto,
    });
  }

  findAll() {
    return this.prisma.lenguaje.findMany();
  }

  async findOne(id: string) {
    const lenguaje = await this.prisma.lenguaje.findUnique({
      where: { id },
    });

    if (!lenguaje) {
      throw new NotFoundException(`Lenguaje con ID ${id} no encontrado`);
    }

    return lenguaje;
  }

  async update(id: string, updateLenguajeDto: UpdateLenguajeDto) {
    await this.findOne(id);

    return this.prisma.lenguaje.update({
      where: { id },
      data: updateLenguajeDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.lenguaje.delete({
      where: { id },
    });
  }
}
