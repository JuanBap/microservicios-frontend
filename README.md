# Cursos Microservice - Frontend

Frontend para el microservicio de gestión de cursos e inscripciones, desarrollado con Next.js, shadcn/ui, Lucide icons y Tailwind CSS.

## Características

- ✅ Dashboard con estadísticas del sistema
- ✅ Gestión completa de cursos (CRUD)
- ✅ Gestión de inscripciones de estudiantes
- ✅ Interfaz responsive y moderna
- ✅ Filtros y búsqueda
- ✅ Estados de carga y manejo de errores

## Tecnologías

- **Next.js 15** - Framework de React
- **shadcn/ui** - Biblioteca de componentes
- **Lucide React** - Iconos
- **Tailwind CSS** - Estilos
- **JavaScript** - Lenguaje de programación

## Configuración

1. Instalar dependencias:
```bash
npm install
```

2. Configurar la URL de la API:
Crear un archivo `.env.local` en la raíz del proyecto:
```env
NEXT_PUBLIC_API_URL=https://true-urgently-horse.ngrok-free.app
```

Para usar localmente:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Ejecutar el servidor de desarrollo:
```bash
npm run dev
```

4. Abrir [http://localhost:3000](http://localhost:3000) en el navegador

## Estructura del Proyecto

```
src/
├── app/
│   ├── courses/          # Página de gestión de cursos
│   ├── enrollments/      # Página de gestión de inscripciones
│   ├── layout.js         # Layout principal con navegación
│   └── page.js           # Dashboard principal
├── components/
│   ├── ui/               # Componentes de shadcn/ui
│   └── Navigation.js     # Componente de navegación
└── lib/
    ├── api.js            # Servicio de API
    └── utils.js          # Utilidades
```

## API Endpoints

El frontend se conecta con los siguientes endpoints:

- `GET /health` - Estado del sistema
- `GET /courses` - Listar cursos
- `POST /courses` - Crear curso
- `PATCH /courses/:id` - Actualizar curso
- `DELETE /courses/:id` - Eliminar curso
- `GET /enrollments` - Listar inscripciones
- `POST /enrollments` - Crear inscripción
- `PATCH /enrollments/:id` - Actualizar inscripción
- `DELETE /enrollments/:id` - Eliminar inscripción

## Funcionalidades

### Dashboard
- Estado del sistema y base de datos
- Estadísticas de cursos e inscripciones
- Lista de cursos e inscripciones recientes

### Gestión de Cursos
- Crear, editar y eliminar cursos
- Filtros por estado (activo/inactivo)
- Búsqueda por título y descripción
- Validación de formularios

### Gestión de Inscripciones
- Crear inscripciones vinculando estudiantes y cursos
- Actualizar estado de inscripciones
- Filtros por estado (activa/cancelada)
- Búsqueda por estudiante o curso