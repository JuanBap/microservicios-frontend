// API Service for Cursos Microservice
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning': 'true',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Verificar si la respuesta es JSON
      const contentType = response.headers.get('content-type');
      
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        // Si no es JSON, devolver un array vacío para evitar errores
        console.warn('API returned non-JSON response, returning empty array');
        return [];
      }
    } catch (error) {
      console.error('API request failed:', error);
      // Devolver datos vacíos en lugar de lanzar error para evitar crashes
      return [];
    }
  }

  // Health Check
  async getHealth() {
    return this.request('/health');
  }

  // Courses
  async getCourses(isActive = null) {
    const params = isActive !== null ? `?isActive=${isActive}` : '';
    return this.request(`/courses${params}`);
  }

  async getActiveCourses() {
    return this.request('/courses/active');
  }

  async getCourse(id) {
    return this.request(`/courses/${id}`);
  }

  async createCourse(courseData) {
    return this.request('/courses', {
      method: 'POST',
      body: JSON.stringify(courseData),
    });
  }

  async updateCourse(id, courseData) {
    return this.request(`/courses/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(courseData),
    });
  }

  async deleteCourse(id) {
    return this.request(`/courses/${id}`, {
      method: 'DELETE',
    });
  }

  // Enrollments
  async getEnrollments(studentId = null, courseId = null) {
    const params = new URLSearchParams();
    if (studentId) params.append('studentId', studentId);
    if (courseId) params.append('courseId', courseId);
    const queryString = params.toString();
    return this.request(`/enrollments${queryString ? `?${queryString}` : ''}`);
  }

  async getStudentEnrollments(studentId) {
    return this.request(`/enrollments/student/${studentId}`);
  }

  async getCourseEnrollments(courseId) {
    return this.request(`/enrollments/course/${courseId}`);
  }

  async getEnrollment(id) {
    return this.request(`/enrollments/${id}`);
  }

  async createEnrollment(enrollmentData) {
    return this.request('/enrollments', {
      method: 'POST',
      body: JSON.stringify(enrollmentData),
    });
  }

  async updateEnrollment(id, enrollmentData) {
    return this.request(`/enrollments/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(enrollmentData),
    });
  }

  async deleteEnrollment(id) {
    return this.request(`/enrollments/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
