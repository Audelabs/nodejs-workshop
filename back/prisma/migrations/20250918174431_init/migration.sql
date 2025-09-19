-- CreateTable
CREATE TABLE "public"."Estudiante" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "nombre" TEXT,

    CONSTRAINT "Estudiante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Calificacion" (
    "id" SERIAL NOT NULL,
    "materia" TEXT NOT NULL,
    "calificacion" INTEGER NOT NULL,
    "estudianteId" INTEGER NOT NULL,

    CONSTRAINT "Calificacion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudiante_email_key" ON "public"."Estudiante"("email");

-- AddForeignKey
ALTER TABLE "public"."Calificacion" ADD CONSTRAINT "Calificacion_estudianteId_fkey" FOREIGN KEY ("estudianteId") REFERENCES "public"."Estudiante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
