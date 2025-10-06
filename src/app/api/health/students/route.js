export async function GET() {
  try {
    const response = await fetch('https://damaris-evacuative-unclannishly.ngrok-free.dev/students/health', {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      return Response.json({ status: 'active', service: 'EstudiantesSvc' })
    } else {
      return Response.json({ status: 'error', service: 'EstudiantesSvc' }, { status: response.status })
    }
  } catch (error) {
    console.error('Health check failed for EstudiantesSvc:', error)
    return Response.json({ status: 'error', service: 'EstudiantesSvc', error: error.message }, { status: 500 })
  }
}
