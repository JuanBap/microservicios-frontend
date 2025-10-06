'use client'

import { BookOpen, Users, GraduationCap, Database, Network, ArrowRight, CheckCircle, Code, Server, Globe } from 'lucide-react'
import Link from 'next/link'
import HealthCheckProxy from '@/components/HealthCheckProxy'

export default function HomePage() {
  const features = [
    {
      icon: BookOpen,
      title: 'Gestión de Cursos',
      description: 'Crear, editar, eliminar y visualizar cursos. Gestionar el estado activo/inactivo de los cursos.',
      href: '/courses',
      color: 'text-blue-600'
    },
    {
      icon: GraduationCap,
      title: 'Gestión de Estudiantes',
      description: 'Administrar información de estudiantes, buscar y filtrar por diferentes criterios.',
      href: '/students',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Inscripciones',
      description: 'Gestionar las inscripciones de estudiantes a cursos. Ver historial y estado de inscripciones.',
      href: '/enrollments',
      color: 'text-purple-600'
    }
  ]

  const microservices = [
    {
      name: 'CursosSvc',
      port: '3001',
      url: 'https://true-urgently-horse.ngrok-free.app',
      description: 'Maneja cursos e inscripciones. Valida estudiantes consultando al servicio de estudiantes.',
      endpoints: ['GET /courses', 'POST /courses', 'PATCH /courses/:id', 'DELETE /courses/:id', 'GET /enrollments', 'POST /enrollments', 'PATCH /enrollments/:id', 'DELETE /enrollments/:id']
    },
    {
      name: 'EstudiantesSvc',
      port: '3002',
      url: 'https://damaris-evacuative-unclannishly.ngrok-free.dev',
      description: 'Gestiona la información y búsqueda de estudiantes. No llama a otros servicios.',
      endpoints: ['GET /students', 'POST /students', 'GET /students/search', 'PATCH /students/:id', 'GET /students/:id']
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
              Sistema de Gestión de Cursos
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Una aplicación web moderna construida con microservicios para la gestión completa de cursos, estudiantes e inscripciones.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  href="/courses"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                >
                  Comenzar
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Funcionalidades Principales
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Explora todas las capacidades de nuestro sistema de gestión educativa
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon
                return (
                  <Link
                    key={feature.title}
                    href={feature.href}
                    className="group relative bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
                  >
                    <div>
                      <span className={`rounded-lg inline-flex p-3 ${feature.color} bg-gray-50 group-hover:bg-gray-100`}>
                        <Icon className="h-6 w-6" />
                      </span>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-gray-900 group-hover:text-blue-600">
                        {feature.title}
                      </h3>
                      <p className="mt-2 text-base text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                    <span className="absolute top-6 right-6 text-gray-300 group-hover:text-gray-400">
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Link>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Microservices Architecture Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Arquitectura de Microservicios
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Nuestro sistema está construido con una arquitectura de microservicios moderna y escalable
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {microservices.map((service, index) => (
                <div key={service.name} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Server className="h-8 w-8 text-blue-600" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{service.name}</h3>
                      <p className="text-sm text-gray-500">Puerto: {service.port}</p>
                    </div>
                  </div>
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-900">URL del servicio:</p>
                    <a 
                      href={service.name === 'CursosSvc' ? 'https://true-urgently-horse.ngrok-free.app/health' : 'https://damaris-evacuative-unclannishly.ngrok-free.dev/students/health'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 hover:text-blue-800 break-all underline"
                    >
                      {service.name === 'CursosSvc' ? 'https://true-urgently-horse.ngrok-free.app/health' : 'https://damaris-evacuative-unclannishly.ngrok-free.dev/students/health'}
                    </a>
                    <HealthCheckProxy 
                      serviceName={service.name}
                    />
                  </div>
                  <p className="mt-4 text-base text-gray-600">{service.description}</p>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">Endpoints disponibles:</h4>
                    <ul className="space-y-1">
                      {service.endpoints.map((endpoint, idx) => (
                        <li key={idx} className="flex items-center text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                          <Code className="h-3 w-3 text-gray-400 mr-2" />
                          {endpoint}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Communication Flow Section */}
      <div className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Comunicación Entre Microservicios
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Cómo los microservicios se comunican para proporcionar una experiencia integrada
            </p>
          </div>

          <div className="mt-12">
            <div className="bg-white rounded-lg shadow-sm p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Flujo de Comunicación</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100">
                          <Globe className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">Frontend (Vercel)</h4>
                        <p className="text-sm text-gray-600">Conoce ambos servicios y puede crear estudiantes o inscribirlos directamente</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-green-100">
                          <Network className="h-4 w-4 text-green-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">CursosSvc</h4>
                        <p className="text-sm text-gray-600">Valida studentId consultando EstudiantesSvc antes de crear inscripciones</p>
                        <a 
                          href="https://true-urgently-horse.ngrok-free.app/health"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 mt-1 underline"
                        >
                          https://true-urgently-horse.ngrok-free.app/health
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-100">
                          <Database className="h-4 w-4 text-purple-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">EstudiantesSvc</h4>
                        <p className="text-sm text-gray-600">No llama a otros servicios. Solo responde consultas de validación</p>
                        <a 
                          href="https://damaris-evacuative-unclannishly.ngrok-free.dev/students/health"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:text-blue-800 mt-1 underline"
                        >
                          https://damaris-evacuative-unclannishly.ngrok-free.dev/students/health
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-100">
                          <Database className="h-4 w-4 text-orange-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h4 className="text-sm font-medium text-gray-900">Supabase</h4>
                        <p className="text-sm text-gray-600">Cada servicio tiene su propia base de datos independiente en Supabase</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Casos de Uso Principales</h3>
                  <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Caso A - Estudiante ya existe</h4>
                      <p className="text-sm text-gray-600 mb-2">1. Frontend → CursosSvc: POST /enrollments</p>
                      <p className="text-sm text-gray-600 mb-2">2. CursosSvc → EstudiantesSvc: GET /students/:id (validar)</p>
                      <p className="text-sm text-gray-600">3. Si válido: CursosSvc → Frontend: 201 Created</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">Caso B - Registro + inscripción</h4>
                      <p className="text-sm text-gray-600 mb-2">1. Frontend → EstudiantesSvc: POST /students</p>
                      <p className="text-sm text-gray-600 mb-2">2. Frontend → CursosSvc: POST /enrollments</p>
                      <p className="text-sm text-gray-600">3. CursosSvc valida estudiante y crea inscripción</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technologies Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Tecnologías Utilizadas
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
              Stack tecnológico moderno para una arquitectura de microservicios robusta
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Frontend</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Next.js 14 con App Router
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Deploy en Vercel
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Tailwind CSS
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Backend</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    NestJS Framework
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Ngrok para exposición HTTPS
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Comunicación HTTP/REST
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Manejo de errores y fallbacks
                  </li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Base de Datos</h3>
                <ul className="space-y-2">
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Supabase (PostgreSQL)
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Bases de datos independientes
                  </li>
                  <li className="flex items-center text-sm text-gray-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Conexión segura HTTPS
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">¿Listo para comenzar?</span>
            <span className="block text-blue-200">Explora las funcionalidades del sistema</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50"
              >
                Ver Cursos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="ml-3 inline-flex rounded-md shadow">
              <Link
                href="/students"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400"
              >
                Ver Estudiantes
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}