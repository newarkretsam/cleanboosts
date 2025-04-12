export async function GET() {
  try {
    // Fetch categories from external API
    const response = await fetch('https://dash.sellhub.cx/api/sellhub/products/categories', {
      headers: {
        "Authorization": process.env.SELLHUB_API_TOKEN
      },
    });

    if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
