# Solución para Error de CORS con ngrok

## 🚨 Problema Identificado

Al intentar hacer peticiones directas desde el navegador a una API expuesta con ngrok, se produce el siguiente error:

```
Access to fetch at 'https://true-urgently-horse.ngrok-free.app/courses' from origin 'http://localhost:3000' has been blocked by CORS policy: Request header field ngrok-skip-browser-warning is not allowed by Access-Control-Allow-Headers in preflight response.
```

## 🔍 Causa del Problema

1. **CORS Policy**: ngrok no permite el header `ngrok-skip-browser-warning` en peticiones desde el navegador
2. **Preflight Request**: El navegador envía una petición OPTIONS antes de la petición real
3. **Headers no permitidos**: ngrok rechaza peticiones con headers personalizados desde el frontend

## ✅ Solución Implementada

### **Proxy de Next.js API Routes**

En lugar de hacer peticiones directas desde el frontend, usamos las API routes de Next.js como proxy:

#### 1. Estructura del Proxy
```
src/app/api/
├── courses/
│   ├── route.js          # GET, POST /api/courses
│   └── [id]/
│       └── route.js      # GET, PATCH, DELETE /api/courses/[id]
└── enrollments/
    ├── route.js          # GET, POST /api/enrollments
    └── [id]/
        └── route.js      # GET, PATCH, DELETE /api/enrollments/[id]
```

#### 2. Ejemplo de Implementación
```javascript
// src/app/api/courses/route.js
export async function GET(request) {
  try {
    const response = await fetch('https://true-urgently-horse.ngrok-free.app/courses', {
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Proxy API error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

#### 3. Servicio de API Actualizado
```javascript
// src/lib/api-proxy.js
class ApiServiceProxy {
  async request(endpoint, options = {}) {
    const url = `/api${endpoint}`;  // Usa rutas locales
    // ... resto de la implementación
  }
}
```

## 🔧 Ventajas de esta Solución

1. **Sin problemas de CORS**: Las peticiones van del frontend al proxy local
2. **Headers manejados en servidor**: El proxy envía los headers correctos a ngrok
3. **Misma interfaz**: El código del frontend no cambia significativamente
4. **Mejor rendimiento**: Menos latencia en desarrollo
5. **Más seguro**: Los headers sensibles se manejan en el servidor

## 🚀 Despliegue en Vercel

### **¿Funcionará en Vercel?**

**SÍ, funcionará perfectamente** porque:

1. **API Routes de Next.js**: Vercel soporta completamente las API routes
2. **Sin dependencias externas**: Solo usa fetch nativo de Node.js
3. **Headers manejados en servidor**: No hay problemas de CORS
4. **Escalabilidad**: Vercel maneja automáticamente el escalado

### **Configuración para Producción**

1. **Variables de entorno**:
```env
# .env.production
NEXT_PUBLIC_API_URL=https://tu-backend-produccion.com
```

2. **Actualizar URLs en el proxy**:
```javascript
// Cambiar de ngrok a URL de producción
const response = await fetch(process.env.BACKEND_URL + '/courses', {
  headers: {
    'Accept': 'application/json',
    // Remover header de ngrok en producción
  },
});
```

3. **Deploy en Vercel**:
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📋 Pasos para Implementar la Solución

1. **Crear rutas API** en `src/app/api/`
2. **Implementar proxy** para cada endpoint
3. **Actualizar servicio de API** para usar rutas locales
4. **Cambiar imports** en componentes
5. **Probar funcionalidad** completa

## 🎯 Resultado Final

- ✅ **Sin errores de CORS**
- ✅ **Funcionalidad completa** (CRUD)
- ✅ **Compatible con Vercel**
- ✅ **Fácil migración** a producción
- ✅ **Mantenible** y escalable

## 🔄 Migración a Producción

Cuando estés listo para producción:

1. **Configurar backend** en servidor real
2. **Actualizar URLs** en las rutas API
3. **Remover headers** de ngrok
4. **Deploy** en Vercel
5. **Configurar variables** de entorno

La solución es **completamente portable** y funcionará en cualquier entorno de despliegue.
