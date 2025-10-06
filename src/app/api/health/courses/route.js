export async function GET() {
  try {
    const response = await fetch('https://true-urgently-horse.ngrok-free.app/health', {
      method: 'GET',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })

    if (response.ok) {
      return Response.json({ status: 'active', service: 'CursosSvc' })
    } else {
      return Response.json({ status: 'error', service: 'CursosSvc' }, { status: response.status })
    }
  } catch (error) {
    console.error('Health check failed for CursosSvc:', error)
    return Response.json({ status: 'error', service: 'CursosSvc', error: error.message }, { status: 500 })
  }
}
