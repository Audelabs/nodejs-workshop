# Node.js Workshop 🚀

¡Bienvenido/a al taller de Node.js! Este proyecto es una base para que puedas construir una aplicación completa con un backend en **NestJS** y un frontend en **Astro**.

## Arquitectura del Proyecto

Para que entiendas cómo se conectan las piezas, aquí tienes un resumen de la arquitectura:

- **Backend (NestJS):** Es el cerebro de la aplicación. Una API REST construida con NestJS que se encarga de toda la lógica de negocio, la validación de datos y la comunicación con la base de datos.
- **Frontend (Astro):** Es la cara visible de la aplicación. Un sitio web rápido y moderno construido con Astro que consume los datos del backend para mostrarlos al usuario.
- **Base de Datos (PostgreSQL + Prisma):** Utilizamos una base de datos PostgreSQL para almacenar toda la información. **Prisma** actúa como nuestro ORM (Object-Relational Mapper), permitiéndonos interactuar con la base de datos de una forma segura e intuitiva desde el backend.
- **Docker:** Usamos `docker-compose` para levantar servicios esenciales como la base de datos PostgreSQL y Adminer (un gestor visual de bases de datos). Esto te permite tener un entorno de desarrollo consistente sin necesidad de instalar PostgreSQL en tu máquina.

---

## 🚀 Para Empezar (Guía Rápida)

Sigue estos pasos para tener todo el entorno funcionando en tu máquina.

### 1. Clona el Repositorio

```bash
git clone https://github.com/tuuser/nodejs-workshop.git
cd nodejs-workshop
```

### 2. Levanta la Base de Datos con Docker

Este comando iniciará un contenedor con PostgreSQL y otro con Adminer.

```bash
docker-compose up -d
```

### 3. Configura, Instala y Corre el Backend

```bash
# Navega a la carpeta del backend
cd back

# Crea tu archivo de entorno (puedes dejarlo como está)
cp .env.example .env

# Instala las dependencias
npm install

# Corre las migraciones de la base de datos
npx prisma migrate dev

# Inicia el servidor de desarrollo
npm run start:dev
```

### 4. Instala y Corre el Frontend

```bash
# (En una nueva terminal) Navega a la carpeta del frontend
cd front

# Instala las dependencias
npm install

# Inicia el servidor de desarrollo
npm run dev
```

### 5. ¡Listo! Puertos de Conexión

Ya deberías tener todo funcionando. Aquí tienes los puertos para acceder a cada servicio:

- **Backend:** `http://localhost:3000`
- **Frontend:** `http://localhost:4321`
- **PostgreSQL (conexión directa):** `localhost:5432`
- **Adminer (gestor visual de BD):** `http://localhost:8080`
  - **Sistema:** `PostgreSQL`
  - **Servidor:** `postgres`
  - **Usuario:** `postgres`
  - **Contraseña:** `postgres`
  - **Base de datos:** `workshopdb`

---

## 🛠️ Flujo de Trabajo: Cómo Añadir una Nueva Funcionalidad

Esta es la guía principal para hacer crecer la aplicación. Sigue estos pasos cada vez que quieras añadir una nueva entidad (como `Cursos`, `Profesores`, etc.).

**Ejemplo práctico: "Cómo añadir un modelo `Curso`"**

### Paso 1: Modificar el Esquema de la Base de Datos

Abre el archivo `/back/prisma/schema.prisma` y añade el nuevo modelo. Prisma define cómo se verán tus tablas en la base de datos.

```prisma
// /back/prisma/schema.prisma

model Curso {
  id          Int     @default(autoincrement()) @id
  nombre      String
  descripcion String?
  // Aquí podrías añadir relaciones con otros modelos
}
```

### Paso 2: Crear y Aplicar la Migración

Desde la terminal, dentro de la carpeta `/back`, ejecuta el siguiente comando. Esto generará los archivos SQL necesarios, actualizará la base de datos y pondrá al día el cliente de Prisma para que reconozca el nuevo modelo.

```bash
# Desde la carpeta /back
npx prisma migrate dev --name anadir-modelo-curso
```

### Paso 3: Crear el Recurso en NestJS (Backend)

Usa el CLI de NestJS para generar automáticamente el módulo, controlador y servicio para `Curso`. Esto nos ahorra mucho trabajo repetitivo.

```bash
# Desde la carpeta /back
nest g resource cursos
```

Selecciona `REST API` y confirma que genere los puntos de entrada CRUD. Esto creará una nueva carpeta `/back/src/cursos` con todo lo que necesitas.

### Paso 4: Implementar la Lógica en el Servicio

Abre el archivo `/back/src/cursos/cursos.service.ts`. Inyecta `PrismaService` y úsalo para implementar los métodos que interactuarán con la base de datos.

```typescript
// /back/src/cursos/cursos.service.ts
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service"; // ¡Asegúrate de que la ruta sea correcta!
import { Prisma } from "@prisma/client";

@Injectable()
export class CursosService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.CursoCreateInput) {
    return this.prisma.curso.create({ data });
  }

  findAll() {
    return this.prisma.curso.findMany();
  }

  findOne(id: number) {
    return this.prisma.curso.findUnique({ where: { id } });
  }

  // ... implementa update() y remove()
}
```

### Paso 5: Crear la Página en Astro (Frontend)

Finalmente, crea una página en el frontend para mostrar los datos.

1. Crea un nuevo archivo en `/front/src/pages/cursos.astro`.
2. Dentro de este archivo, haz un `fetch` al endpoint del backend (ej: `http://localhost:3000/cursos`) para obtener los datos y renderizarlos.

```astro
---
// /front/src/pages/cursos.astro
import Layout from '../layouts/Layout.astro';

// Hacemos la petición a nuestro backend
const response = await fetch('http://localhost:3000/cursos');
const cursos = await response.json();
---
<Layout title="Lista de Cursos">
  <main>
    <h1>Nuestros Cursos</h1>
    <ul>
      {cursos.map(curso => (
        <li>{curso.nombre}</li>
      ))}
    </ul>
  </main>
</Layout>
```

¡Y ya está! Has añadido una nueva funcionalidad de forma ordenada.

---

## Comandos Útiles

Aquí tienes un resumen de los comandos más importantes que usarás durante el desarrollo.

### Backend (`/back`)

- `npm run start:dev`: Iniciar servidor en modo desarrollo.
- `npx prisma migrate dev --name <nombre-migracion>`: Crear una nueva migración de base de datos después de cambiar `schema.prisma`.
- `npx prisma studio`: Abrir una interfaz visual en el navegador para ver y editar los datos de tu base de datos. ¡Muy recomendado!
- `nest g resource <nombre>`: Generar un nuevo módulo API completo (módulo, controlador, servicio, DTOs, entidad).

### Frontend (`/front`)

- `npm run dev`: Iniciar servidor de desarrollo.
- `npm run build`: Compilar el sitio para producción.
- `npm run preview`: Previsualizar el sitio de producción localmente.
