import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Calificacion, Estudiante, Prisma } from '@prisma/client';

@Injectable()
export class EstudiantesService {
  constructor(private prisma: PrismaService) {}

  async calificaciones(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EstudianteWhereUniqueInput;
    where?: Prisma.EstudianteWhereInput;
    orderBy?: Prisma.EstudianteOrderByWithRelationInput;
  }): Promise<Estudiante[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.estudiante.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        calificacion: true,
      },
    });
  }

  async estudiantePorEmail(email: string): Promise<Estudiante | null> {
    return this.prisma.estudiante.findFirst({
      where: {
        email,
      },
    });
  }

  async createEstudiante(
    data: Prisma.EstudianteCreateInput,
  ): Promise<Estudiante> {
    return this.prisma.estudiante.create({
      data,
    });
  }

  async agregarCalificacion(
    data: Prisma.CalificacionCreateInput,
  ): Promise<Calificacion> {
    return this.prisma.calificacion.create({
      data,
    });
  }

  async deleteEstudiante(
    where: Prisma.EstudianteWhereUniqueInput,
  ): Promise<Estudiante> {
    return this.prisma.estudiante.delete({
      where,
    });
  }
}
