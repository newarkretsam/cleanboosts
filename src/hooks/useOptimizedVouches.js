import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { formatDate } from '../utils/dateUtils';
import { processSampleData } from '../utils/dataUtils';
import { getFromCache, saveToCache } from '../utils/cacheUtils';
import { fetchVouchesFromAPI } from '../services/vouchesAPI';

// Main hook
export default function useOptimizedVouches(sampleVouches, limit = 5) {
  const [vouches, setVouches] = useState(processSampleData(sampleVouches, limit));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);
  const requestRef = useRef(null);
  
  // Process sample vouches with pre-computed IDs - memoized
  const processSampleVouches = useCallback((samples) => {
    return processSampleData(samples, limit);
  }, [limit]);

  // Data fetching effect
  useEffect(() => {
    let isMounted = true;
    
    // Try to get from cache first
    const cachedResult = getFromCache();
    if (cachedResult) {
      setVouches(cachedResult);
      return;
    }
    
    setLoading(true);
    
    const fetchVouches = async () => {
      try {
        const controller = new AbortController();
        const signal = controller.signal;
        
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const finalVouches = await fetchVouchesFromAPI(
          limit, 
          signal, 
          formatDate, 
          sampleVouches, 
          processSampleVouches
        );
        
        clearTimeout(timeoutId);
        
        if (!isMounted) return;
        
        // Cache the result
        saveToCache(finalVouches);
        
        if (isMounted) {
          setVouches(finalVouches);
        }
      } catch (err) {
        console.error("Error loading vouches:", err);
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    setTimeout(() => {
      requestRef.current = requestAnimationFrame(() => {
        fetchVouches();
      });
    }, 100);
    
    return () => {
      isMounted = false;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [sampleVouches, processSampleVouches, limit]);
  
  // Create duplicates with unique IDs
  const duplicateVouches = useMemo(() => {
    return vouches.map((vouch, index) => ({ 
      ...vouch, 
      isDuplicate: true,
      _uniqueId: `duplicate-${index}-${Math.floor(Math.random() * 1000000)}`
    }));
  }, [vouches]);
  
  return { vouches, duplicateVouches, loading, error };
}
