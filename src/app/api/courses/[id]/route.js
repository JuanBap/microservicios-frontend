export async function GET(request, { params }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COURSES_API_URL}/courses/${params.id}`, {
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

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();
    const response = await fetch(`${process.env.NEXT_PUBLIC_COURSES_API_URL}/courses/${params.id}`, {
      method: 'PATCH',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
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

export async function DELETE(request, { params }) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_COURSES_API_URL}/courses/${params.id}`, {
      method: 'DELETE',
      headers: {
        'ngrok-skip-browser-warning': 'true',
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Proxy API error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
