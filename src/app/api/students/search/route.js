export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return Response.json({ error: 'Email parameter is required' }, { status: 400 });
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_STUDENTS_API_URL}/students/search?email=${encodeURIComponent(email)}`, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('Students search API error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
