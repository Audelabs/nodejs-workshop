import { Module } from '@nestjs/common';
import { EstudiantesController } from './estudiantes.controller';
import { EstudiantesService } from './estudiantes.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [EstudiantesController],
  providers: [EstudiantesService, PrismaService],
})
export class EstudiantesModule {}
