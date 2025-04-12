import { useState, useEffect } from 'react';
import { apiCaller } from '@/utils/apiCaller';

export default function useProductStock() {
  const [productsStock, setProductsStock] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsStock = async () => {
      try {
        setLoading(true);
        const result = await apiCaller('/api/products', 'GET');
        
        if (result && result.success && result.data) {
          const stockMap = {};
          result.data.forEach(product => {
            stockMap[product.id] = product.stock;
            stockMap[product.productId] = product.stock;
          });
          setProductsStock(stockMap);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsStock();
  }, []);

  return { productsStock, loading, error };
}
