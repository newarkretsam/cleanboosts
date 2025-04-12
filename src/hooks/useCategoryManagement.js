import { useState } from 'react';
import useProductStock from './useProductStock';
import useCategoriesFetch from './useCategoriesFetch';
import { filterProducts } from '@/utils/productFilters';

export default function useCategoryManagement() {
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Use our extracted hooks
  const { productsStock } = useProductStock();
  const { 
    categories,
    allProducts,
    loading,
    error
  } = useCategoriesFetch(productsStock);

  // Filter products by category and search term
  const filteredProducts = filterProducts(allProducts, selectedCategory, searchTerm);

  const handlePurchase = (product) => {
    try {
      // Pass the complete product object instead of just the ID
      setSelectedProduct(product);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Purchase error occurred", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return {
    categories,
    products: filteredProducts,
    loading,
    error,
    selectedCategory,
    searchTerm,
    isModalOpen,
    selectedProduct,
    setSelectedCategory,
    setSearchTerm,
    handlePurchase,
    closeModal
  };
}
