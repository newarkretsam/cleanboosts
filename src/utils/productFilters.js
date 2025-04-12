export function filterProducts(allProducts, selectedCategory, searchTerm) {
  return allProducts
    .filter(product => selectedCategory === "All Products" || product.category === selectedCategory)
    .filter(product => {
      if (!searchTerm.trim()) return true;
      return product.title.toLowerCase().includes(searchTerm.toLowerCase());
    })
    .filter(product => product.hidden === false || product.displayedStatus === "Active");
}
