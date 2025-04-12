import Image from "next/image";

export default function ProductDescriptionModal({ 
  expandedDescriptions, 
  toggleDescription, 
  filteredProducts,
  handlePurchase 
}) {
  // Check if any product description is expanded
  const isAnyDescriptionExpanded = Object.entries(expandedDescriptions).some(([id, expanded]) => expanded);
  
  if (!isAnyDescriptionExpanded) return null;
  
  // Find the expanded product
  const expandedId = Object.entries(expandedDescriptions)
    .find(([id, expanded]) => expanded)?.[0];
  const product = filteredProducts.find(p => p.id === expandedId);
  
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden">
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md" 
        onClick={() => toggleDescription(expandedId)}
      ></div>
      
      <div 
        className="relative z-50 w-[95%] max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl h-auto max-h-[92vh] rounded-xl overflow-hidden shadow-[0_0_30px_5px_rgba(255,0,255,0.4)] animate-fadeIn border border-[#ff00ff]/30"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with gradient */}
        <div className="flex justify-between items-center bg-gradient-to-r from-[#ff00ff]/80 via-[#ff33ff]/80 to-[#cc00cc]/80 backdrop-blur-sm p-4 border-b border-white/20">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold ml-2 text-white">
            {product.title}
          </h3>
          <button 
            onClick={() => toggleDescription(product.id)}
            className="text-white hover:text-gray-200 focus:outline-none mr-2 bg-black/20 hover:bg-black/40 p-2 rounded-full transition-all duration-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Content area with fixed height and scrollable content */}
        <div className="w-full max-h-[calc(92vh-70px)] overflow-y-auto bg-[#0f0f0f]/95 scrollbar-thin scrollbar-thumb-[#ff00ff]/40 scrollbar-track-[#210021]">
          {/* Product image banner - with increased height for better visibility */}
          <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 bg-[#210021] overflow-hidden">
            <Image 
              src={product.imageUrl} 
              alt={product.title}
              layout="fill"
              objectFit="cover" 
              className="opacity-95 hover:opacity-100 transition-all duration-700 ease-in-out p-4"
              quality={100}
              onError={(e) => { e.target.src = '/image/discordBot.webp'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-60"></div>
            
            {/* Price tag floating on image */}
            <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] px-4 py-2 rounded-lg text-white font-bold text-xl shadow-lg shadow-[#ff00ff]/30">
              {product.currency ? `${product.currency === 'usd' ? '$' : product.currency}` : '$'}
              {product.formattedDiscountedPrice || product.discountedPrice.toFixed(2)}
            </div>
          </div>
          
          {/* Product details section - improved readability */}
          <div className="p-6 sm:p-8 bg-[#210021] ">
            {/* Short description with improved styling */}
            {product.shortDescription && (
              <div className="mb-6 text-[#ff33ff] font-medium text-base sm:text-lg border-l-4 border-[#ff00ff]/50 pl-4 py-2 bg-[#ff00ff]/5 rounded-r-md">
                {product.shortDescription}
              </div>
            )}
            
            {/* Stock information with enhanced styling */}
            {product.stock !== undefined && (
              <div className="mb-6">
                {product.stock === null ? (
                  <div className="inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-[#ff00ff]/90 text-white shadow-md shadow-[#ff00ff]/20">
                    Always Available
                  </div>
                ) : product.stock === 0 ? (
                  <div className="inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-red-500/70 text-white shadow-md">
                    Out of Stock
                  </div>
                ) : product.stock <= 10 ? (
                  <div className="inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-[#ff00ff]/90 text-white shadow-md shadow-[#ff00ff]/20">
                    Low Stock: {product.stock}
                  </div>
                ) : (
                  <div className="inline-block px-3 py-1.5 rounded-full text-sm font-medium bg-[#ff00ff]/90 text-white shadow-md shadow-[#ff00ff]/20">
                    In Stock
                  </div>
                )}
              </div>
            )}
            
            {/* Section divider with enhanced glow */}
            <div className="w-full h-0.5 bg-gradient-to-r from-[#ff00ff]/10 via-[#ff00ff]/50 to-[#ff00ff]/10 rounded-full mb-6 shadow-sm shadow-[#ff00ff]/30"></div>
            
            {/* Main description with improved readability */}
            <div className="mb-10">
              <h4 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center">
                <span className="w-1.5 h-6 bg-[#ff00ff] rounded-full mr-2 inline-block"></span>
                Product Description
              </h4>
              <div className="text-gray-100 text-base leading-relaxed styled-scrollbar bg-[#ffffff]/5 p-4 rounded-md border border-[#ff00ff]/10 whitespace-pre-line">
                {product.description}
              </div>
            </div>
            
            {/* Minimum order quantity info with better styling */}
            {product.minOrderQuantity > 1 && (
              <div className="mt-4 mb-6 text-sm text-gray-300 bg-[#310031]/50 p-3 rounded-md border-l-2 border-[#ff00ff]/50">
                <span className="font-medium">Minimum order:</span> {product.minOrderQuantity} {product.minOrderQuantity > 1 ? 'items' : 'item'}
              </div>
            )}
            
            {/* Action buttons fixed at bottom with improved styling */}
            <div className="sticky bottom-0 left-0 right-0 bg-[#210021] from-[#0f0f0f] via-[#0f0f0f] to-[#0f0f0f]/90 pt-4 pb-6">
              <div className="flex items-center justify-between gap-4">
                <button 
                  onClick={() => toggleDescription(product.id)}
                  className="flex-shrink-0 text-sm sm:text-base text-gray-300 hover:text-white bg-[#310031] hover:bg-[#410041]/70 border border-[#ff00ff]/20 rounded-lg px-4 py-3 transition-all duration-300 hover:shadow-md hover:shadow-[#ff00ff]/20"
                >
                  Close
                </button>
                
                <button
                  className={`flex-grow relative overflow-hidden rounded-lg bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] px-6 py-3 text-sm sm:text-base font-semibold text-white transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] transform hover:translate-y-[-2px] ${
                    (product.stock === 0 || product.hidden) ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => {
                    toggleDescription(product.id);
                    handlePurchase(product);
                  }}
                  disabled={product.stock === 0 || product.hidden}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full animate-[shimmer_2s_infinite]"></span>
                  {product.stock === 0 ? 'Out of Stock' : product.hidden ? 'Unavailable' : 'Buy Product'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
