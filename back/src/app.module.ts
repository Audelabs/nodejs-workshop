import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EstudiantesModule } from './estudiantes/estudiantes.module';

@Module({
  imports: [EstudiantesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
