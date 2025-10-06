// API Service using Next.js API routes as proxy
class ApiServiceProxy {
  async request(endpoint, options = {}) {
    const url = `/api${endpoint}`;
    const config = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // console.log('Making proxy request to:', url);

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        console.warn(`API request failed with status ${response.status} for ${url}`);
        return [];
      }
      
      return await response.json();
    } catch (error) {
      console.error('Proxy API request failed:', error);
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

  // Students
  async getStudents(page = 1, limit = 100, isActive = null) {
    const params = new URLSearchParams();
    params.append('page', page.toString());
    params.append('limit', limit.toString());
    if (isActive !== null) params.append('isActive', isActive.toString());
    const queryString = params.toString();
    return this.request(`/students?${queryString}`);
  }

  async getStudent(id) {
    return this.request(`/students/${id}`);
  }

  async searchStudentByEmail(email) {
    return this.request(`/students/search?email=${encodeURIComponent(email)}`);
  }

  async createStudent(studentData) {
    return this.request('/students', {
      method: 'POST',
      body: JSON.stringify(studentData),
    });
  }

  async updateStudent(id, studentData) {
    return this.request(`/students/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(studentData),
    });
  }

  async deleteStudent(id) {
    return this.request(`/students/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiServiceProxy = new ApiServiceProxy();
