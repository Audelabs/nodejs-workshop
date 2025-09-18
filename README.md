# Node.js Workshop

## 🚀 Para empezar

1. Clona el repo:

```bash
git clone https://github.com/tuuser/nodejs-workshop.git
```

## Levanta la base de datos

```bash
cd nodejs-workshop
docker-compose up -d
```

## Instala y corre el backend

```bash
cd backend
npm install
npm run start:dev
```

## Instala y corre el frontend

```bash
cd ../frontend
npm install
npm run dev
```

## Puertos de conexión

- Backend: `http://localhost:3000`
- Frontend: `http://localhost:4321`
- Postgres: `http://localhost:5432`
- Adminer: `http://localhost:8080` (**postgres** / **postgres**)

# Comandos útiles

Crear nuevo recurso NestJS: `nest g resource nombre`
Generar entidad: `nest g entity nombre`
