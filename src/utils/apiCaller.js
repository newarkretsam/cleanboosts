export const apiCaller = async (url, method = 'GET', data = null) => {
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    // Add cache control for GET requests
    cache: method === 'GET' ? 'no-cache' : undefined
  };

  if (data && method !== 'GET') {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.error || `API call failed with status: ${response.status}`);
    }

    return result;
  } catch (error) {
    console.error('API call error:', error);
    throw error;
  }
};