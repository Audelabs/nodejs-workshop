import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';

import { EstudiantesService } from './estudiantes.service';

import {
  Estudiante as EstudianteModel,
  Calificacion as CalificacionModel,
} from '@prisma/client';

@Controller('estudiantes')
export class EstudiantesController {
  constructor(private readonly estudiantesService: EstudiantesService) {}

  @Get()
  async getCalificaciones(): Promise<EstudianteModel[]> {
    console.log('getEstudiantes');
    return this.estudiantesService.calificaciones({});
  }

  @Post()
  async agregarCalificacion(
    @Body()
    calificacionData: {
      nombre: string;
      email: string;
      materia: string;
      calificacion: number;
    },
  ): Promise<CalificacionModel> {
    console.log('agregarCalificacion', calificacionData);

    const { nombre, email, materia, calificacion } = calificacionData;
    if (!email || !nombre || !materia || !calificacion) {
      throw new BadRequestException('Faltan datos');
    }

    let estudiante = await this.estudiantesService.estudiantePorEmail(email);
    if (!estudiante) {
      estudiante = await this.estudiantesService.createEstudiante({
        nombre,
        email,
      });
    }

    // tslint:disable-next-line
    return this.estudiantesService.agregarCalificacion({
      materia,
      calificacion,
      estudiante: {
        connect: { id: estudiante.id },
      },
    });
  }
}
