import { useState, useEffect } from 'react';
import { apiCaller } from '@/utils/apiCaller';
import { productCategories, staticProducts } from '@/data/staticProducts';
import { mapProduct } from '@/utils/productUtils';

export default function useCategoriesFetch(productsStock) {
  const [categories, setCategories] = useState(["All Products"]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        
        const result = await apiCaller('/api/categories', 'GET');
        
        if (result && result.data && result.data.categories) {
          // Process categories and create product map
          const categoriesData = result.data.categories;
          let categoryNames = ["All Products"];
          const extractedProducts = [];
          
          categoriesData.forEach(category => {
            categoryNames.push(category.name);
            
            if (category.categoriesToProducts && Array.isArray(category.categoriesToProducts)) {
              category.categoriesToProducts.forEach(relation => {
                if (relation.product && relation.productId) {
                  const product = relation.product;
                  // Try to get stock value using both IDs
                  const stockValue = productsStock[product.id] !== undefined ? 
                    productsStock[product.id] : 
                    (productsStock[product.productId] !== undefined ? 
                      productsStock[product.productId] : undefined);
                  
                  // Map the product to our expected format
                  const mappedProduct = mapProduct(
                    product, 
                    category.name, 
                    relation.shortDescription, 
                    relation.description,
                    stockValue
                  );
                  extractedProducts.push(mappedProduct);
                }
              });
            }
          });
          
          // Sort categories to ensure "Other" is always last
          categoryNames = categoryNames.sort((a, b) => {
            if (a === "All Products") return -1; // "All Products" always first
            if (b === "All Products") return 1;
            if (a === "Other") return 1; // "Other" always last
            if (b === "Other") return -1;
            return a.localeCompare(b); // Normal alphabetical sort for other categories
          });
          
          setCategories(categoryNames);
          setAllProducts(extractedProducts);
        } else {
          // Fallback to static products data
          setCategories(productCategories);
          setAllProducts(staticProducts);
        }
      } catch (err) {
        setError(err.message);
        setCategories(productCategories);
        setAllProducts(staticProducts);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategories();
  }, [productsStock]);  // Depend on productsStock to refresh when stock data is loaded

  return {
    categories,
    allProducts,
    loading,
    error
  };
}
