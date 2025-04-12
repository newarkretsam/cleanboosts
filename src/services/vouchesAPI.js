
export async function fetchVouchesFromAPI(limit, signal, formatDateFn, sampleVouches, processSampleFn) {
  const response = await fetch('/api/reviews', { signal });
  
  if (!response || !response.ok) {
    throw new Error(`HTTP error! Status: ${response?.status}`);
  }
  
  const data = await response.json();
  
  if (Array.isArray(data.data)) {
    const filteredData = data.data
      .filter(vouch => vouch.proof !== null)
      .slice(0, limit)
      .map((vouch, index) => ({
        ...vouch,
        stars: parseInt(vouch.stars) || 0,
        formattedDate: formatDateFn(vouch.date),
        _uniqueId: `original-${index}-${Math.floor(Math.random() * 1000000)}`
      }));
    
    return filteredData.length > 0 ? filteredData : processSampleFn(sampleVouches);
  }
  
  throw new Error('API did not return an array of vouches');
}
