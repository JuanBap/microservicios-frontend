'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Trash2, Users, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { apiServiceProxy as apiService } from '@/lib/api-proxy'

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState([])
  const [courses, setCourses] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingEnrollment, setEditingEnrollment] = useState(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const [formData, setFormData] = useState({
    studentId: '',
    courseId: '',
    status: 'active'
  })

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Hacer las llamadas de forma individual para mejor manejo de errores
      const enrollmentsData = await apiService.getEnrollments()
      const coursesData = await apiService.getCourses()
      const studentsData = await apiService.getStudents(1, 100, true)
      
      setEnrollments(Array.isArray(enrollmentsData) ? enrollmentsData : [])
      setCourses(Array.isArray(coursesData) ? coursesData : [])
      setStudents(Array.isArray(studentsData) ? studentsData : [])
      
      console.log('Data loaded:', {
        enrollments: enrollmentsData?.length || 0,
        courses: coursesData?.length || 0,
        students: studentsData?.length || 0
      })
    } catch (err) {
      console.error('Error fetching data:', err)
      setError(err.message)
      setEnrollments([])
      setCourses([])
      setStudents([])
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingEnrollment) {
        await apiService.updateEnrollment(editingEnrollment.id, {
          status: formData.status
        })
      } else {
        await apiService.createEnrollment({
          studentId: formData.studentId,
          courseId: formData.courseId
        })
      }

      setShowForm(false)
      setEditingEnrollment(null)
      setFormData({ studentId: '', courseId: '', status: 'active' })
      fetchData()
    } catch (err) {
      setError(err.message)
    }
  }

  const handleEdit = (enrollment) => {
    setEditingEnrollment(enrollment)
    setFormData({
      studentId: enrollment.student_id,
      courseId: enrollment.course_id,
      status: enrollment.status
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de que quieres eliminar esta inscripción?')) {
      try {
        await apiService.deleteEnrollment(id)
        fetchData()
      } catch (err) {
        setError(err.message)
      }
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingEnrollment(null)
    setFormData({ studentId: '', courseId: '', status: 'active' })
  }

  const getCourseTitle = (courseId) => {
    const course = courses.find(c => c.id === courseId)
    return course ? course.title : 'Curso no encontrado'
  }

  const getStudentName = (studentId) => {
    const student = students.find(s => s.id === studentId)
    return student ? student.name : 'Estudiante no encontrado'
  }

  const filteredEnrollments = enrollments.filter(enrollment => {
    const matchesFilter = filter === 'all' || 
      (filter === 'active' && enrollment.status === 'active') || 
      (filter === 'cancelled' && enrollment.status === 'cancelled')
    
    const courseTitle = getCourseTitle(enrollment.course_id).toLowerCase()
    const studentName = getStudentName(enrollment.student_id).toLowerCase()
    const student = students.find(s => s.id === enrollment.student_id)
    const studentEmail = student ? student.email.toLowerCase() : ''
    
    const matchesSearch = courseTitle.includes(searchTerm.toLowerCase()) ||
      studentName.includes(searchTerm.toLowerCase()) ||
      studentEmail.includes(searchTerm.toLowerCase()) ||
      enrollment.student_id.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Cargando inscripciones...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="py-6 sm:px-0">
          <div className="mb-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Gestión de Inscripciones</h1>
                <p className="mt-2 text-gray-600">
                  Administra todas las inscripciones de estudiantes
                </p>
              </div>
              <Button onClick={() => setShowForm(true)} className="w-full sm:w-auto">
                <Plus className="h-4 w-4 mr-2" />
                Nueva Inscripción
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600">Error: {error}</p>
            </div>
          )}

          {/* Filters */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end gap-4">
            <div className="sm:flex-1">
              <Input
                placeholder="Buscar por nombre, email o curso..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:max-w-sm"
              />
            </div>
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filtrar por estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las inscripciones</SelectItem>
                <SelectItem value="active">Solo activas</SelectItem>
                <SelectItem value="cancelled">Solo canceladas</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <CardTitle>
                    {editingEnrollment ? 'Editar Inscripción' : 'Nueva Inscripción'}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {!editingEnrollment && (
                      <>
                        <div>
                          <Label htmlFor="studentId">Estudiante *</Label>
                          <Select
                            value={formData.studentId}
                            onValueChange={(value) => setFormData({ ...formData, studentId: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un estudiante" />
                            </SelectTrigger>
                            <SelectContent>
                              {students.map((student) => (
                                <SelectItem key={student.id} value={student.id}>
                                  {student.name} - {student.email}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          {students.length === 0 && (
                            <p className="text-sm text-gray-500 mt-1">
                              No hay estudiantes disponibles. Asegúrate de que el servicio de estudiantes esté funcionando.
                            </p>
                          )}
                        </div>
                        
                        <div>
                          <Label htmlFor="courseId">Curso *</Label>
                          <Select
                            value={formData.courseId}
                            onValueChange={(value) => setFormData({ ...formData, courseId: value })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecciona un curso" />
                            </SelectTrigger>
                            <SelectContent>
                              {courses.map((course) => (
                                <SelectItem key={course.id} value={course.id}>
                                  {course.title} - ${course.price?.toFixed(2) || '0.00'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </>
                    )}
                    
                    {editingEnrollment && (
                      <div>
                        <Label htmlFor="status">Estado</Label>
                        <Select
                          value={formData.status}
                          onValueChange={(value) => setFormData({ ...formData, status: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Activa</SelectItem>
                            <SelectItem value="cancelled">Cancelada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                    
                    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2">
                      <Button type="button" variant="outline" onClick={handleCancel} className="w-full sm:w-auto">
                        Cancelar
                      </Button>
                      <Button type="submit" className="w-full sm:w-auto">
                        {editingEnrollment ? 'Actualizar' : 'Crear'}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Enrollments Table */}
          <Card>
            <CardHeader>
              <CardTitle>Inscripciones ({filteredEnrollments.length})</CardTitle>
              <CardDescription>
                Lista de todas las inscripciones en el sistema
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredEnrollments.length === 0 ? (
                <div className="text-center py-8">
                  <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No se encontraron inscripciones</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table className="min-w-[760px]">
                    <TableHeader>
                      <TableRow>
                        <TableHead>Estudiante</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Curso</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="hidden md:table-cell">Fecha de Inscripción</TableHead>
                        <TableHead>Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredEnrollments.map((enrollment) => {
                      const student = students.find(s => s.id === enrollment.student_id);
                      return (
                        <TableRow key={enrollment.id}>
                          <TableCell className="font-medium">
                            {student ? student.name : 'Estudiante no encontrado'}
                          </TableCell>
                          <TableCell className="text-sm text-gray-500 max-w-[200px] truncate md:max-w-none">
                            {student ? student.email : `${enrollment.student_id.slice(0, 8)}...`}
                          </TableCell>
                          <TableCell>{getCourseTitle(enrollment.course_id)}</TableCell>
                          <TableCell>
                            <Badge variant={enrollment.status === 'active' ? 'default' : 'destructive'}>
                              {enrollment.status === 'active' ? 'Activa' : 'Cancelada'}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            {new Date(enrollment.created_at).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleEdit(enrollment)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(enrollment.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
