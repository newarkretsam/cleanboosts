'use client'

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import dynamic from 'next/dynamic';
import { AuroraBackground } from "@/components/ui/aurora-background";
import DiamondBackground from "@/components/DiamondBackground";
import { useEffect, useState } from "react";
import ProductScroll from "@/components/ProductScroll";
import PageLoader from "@/components/PageLoader";
import OptimizedTestimonials from "@/components/OptimizedTestimonials";
import useCategoryManagement from "@/hooks/useCategoryManagement";

import AOS from "aos";
import "aos/dist/aos.css";

const CheckoutModal = dynamic(() => import('@/components/CheckoutModal'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 flex items-center justify-center bg-black/50">
    <div className="w-12 h-12 rounded-full border-4 border-[#ff00ff] border-t-transparent animate-spin"></div>
  </div>
});

export default function Home() {
  // Use the updated useCategoryManagement hook which now includes all product management functionality
  const {
    products: filteredProducts,
    categories,
    loading,
    error,
    isModalOpen,
    selectedProduct,
    selectedCategory,
    searchTerm,
    setSelectedCategory,
    setSearchTerm,
    handlePurchase,
    closeModal
  } = useCategoryManagement();

  const [proofModalOpen, setProofModalOpen] = useState(false);
  const [currentProof, setCurrentProof] = useState(null);
  const [pageLoading, setPageLoading] = useState(true);
  
  // Add state to track expanded descriptions
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  // Function to toggle description visibility
  const toggleDescription = (productId) => {
    setExpandedDescriptions(prev => ({
      ...prev,
      [productId]: !prev[productId]
    }));
  };

  // Update useEffect to handle body scroll locking when modal is open
  useEffect(() => {
    console.log("Filtered products:", filteredProducts);

    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-out',
    });

    const minLoadingTime = setTimeout(() => {
      setPageLoading(false);
    }, 2500);

    // Handle body scroll locking when any description is expanded
    const hasExpandedDescription = Object.values(expandedDescriptions).some(value => value);
    if (hasExpandedDescription) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      clearTimeout(minLoadingTime);
      // Reset body overflow when component unmounts
      document.body.style.overflow = '';
    };
  }, [filteredProducts, expandedDescriptions]);

  const handleViewProof = (proof) => {
    setCurrentProof(proof);
    setProofModalOpen(true);
  };
  
  const closeProofModal = () => {
    setProofModalOpen(false);
    setCurrentProof(null);
  };

  return (
    <>
      {pageLoading ? (
        <PageLoader />
      ) : (
        <AuroraBackground className={`min-h-screen`}>
          <div className="min-h-screen">
            {/* Navbar */}
            <Navbar />
            
            {/* Hero Section - Modified to maintain full height with product scroll at bottom */}
            <section id="home" className="relative my-24 mt-36 flex flex-col justify-between" data-aos="fade-in">
              
              {/* Main hero content */}
              <div className="container mx-auto px-4 sm:px-6 relative z-10 flex-grow flex flex-col justify-center py-16">
                <div className="flex flex-col md:flex-row items-center justify-center md:gap-6 lg:gap-10">
                  <div className="w-full md:w-1/2 text-center md:text-left px-4" data-aos="fade-right">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 animate-gradient"
                        style={{ textShadow: '0 4px 8px rgba(0, 0, 0, 0.5)' }}>
                      <span className="text-transparent tracking-tighter bg-clip-text bg-gradient-to-r from-[#ff00ff] via-[#ff33ff] to-[#e778d1] animate-gradient"
                            style={{ textShadow: '0 2px 10px rgba(255, 0, 255, 0.6)' }}>
                        CleanBoosts
                      </span>
                    </h1>
                    
                    <p className="text-base sm:text-md md:text-md text-gray-300 mb-6 sm:mb-8 max-w-xl mx-auto md:mx-0"
                       style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.7)' }}>
                      Welcome to Cleanboosts, your ultimate destination for maximizing the potential of your Discord server! We offer various premium services, including <span className="text-[#ff66ff] font-medium" style={{ textShadow: '0 0 4px rgba(255, 102, 255, 0.5)' }}>Server Boosts</span>, <span className="text-[#ff66ff] font-medium" style={{ textShadow: '0 0 4px rgba(255, 102, 255, 0.5)' }}>Nitro Tokens</span>, <span className="text-[#ff66ff] font-medium" style={{ textShadow: '0 0 4px rgba(255, 102, 255, 0.5)' }}>Discord Decorations</span>, and more. Our solutions are designed to enhance your Discord experience, providing fast, reliable, and affordable options that help you grow your server effortlessly. Enjoy unbeatable prices, budget-friendly deals, and the opportunity to earn free Nitro perks. <span className="font-medium" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.8)' }}>Boost smarter and transform your server with CleanBoosts today!</span>
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center md:justify-start mt-6">
                      <Link href="#products" legacyBehavior>
                        <a className="bg-[#ff00ff]/80 hover:bg-[#ff33ff]/80 border-2 text-bold font-medium border-[#ff00ff]/20 text-white px-5 sm:px-6 md:px-7 py-2.5 sm:py-2.5 md:py-2.5 rounded-full text-sm sm:text-base md:text-[15px] lg:text-lg transition-colors animate-border-pulse">
                          Order Now
                        </a>
                      </Link>
                      <Link href="#about" legacyBehavior>
                        <a className="bg-gray-800/50 hover:bg-gray-900/80 border-2 border-[#ff00ff]/20 text-white px-5 sm:px-6 md:px-7 py-2.5 sm:py-2.5 md:py-2.5 rounded-full text-sm sm:text-base md:text-[15px] lg:text-lg transition-colors">
                          Learn More
                        </a>
                      </Link>
                    </div>
                  </div>
    
                  <div className="w-full md:w-1/2 relative mt-6 md:mt-0" data-aos="fade-left">
                    <div className="relative w-full h-72 flex flex-col gap-3 sm:h-82 md:h-96">
                      <Image
                        className="z-10 animate-float"
                        src="/image/logoRotating.webp"
                        alt="Cleanboosts Hero"
                        layout="fill"
                        objectFit="contain"
                        quality={100}
                        priority
                        style={
                          {
                            filter: 'drop-shadow(0px 0px 8px rgba(255, 0, 255, 0.7))'
                          }
                        } 
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Product Scroll positioned at bottom of hero section */}
              <div className="w-full flex items-center justify-center" data-aos="fade-up">
                <div className="w-2/3 mb-16 flex items-center relative z-10" data-aos="fade-up">
                  <ProductScroll />
                </div>
              </div>
            </section>
          
            {/* About Us Section */}
            <section id="about" className="py-12 md:py-16 bg-transparent relative mt-[-5rem] pt-24 z-20" data-aos="fade-up">
              {/* Straight diamond background with reduced height */}
              <DiamondBackground 
                rotation={0} 
                translateY="-5%" 
                left="-45%" 
                opacity={0.7}
                scale={1.2}
                height="60%" 
              />
              
              <div className="container mx-auto px-4 sm:px-6 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-10 text-white"
                    style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)' }}>
                  About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] animate-gradient"
                              style={{ textShadow: '0 2px 8px rgba(255, 0, 255, 0.5)' }}>CleanBoosts</span>
                </h2>
    
                {/* The pink-animated-border now has the hover-trigger class to ensure the shine effect works */}
                <div className="pink-animated-border rounded-xl overflow-hidden hover-trigger" data-aos="fade-up">
                  <div className="p-0.5 mb-0">
                    {/* Position this shine effect at the parent level for maximum visibility */}
                    <div className="shine-effect absolute top-0 left-0 w-full h-full z-10"></div>
                    
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                      <div className="absolute top-5 right-5 w-40 h-40 rounded-full bg-[#ff00ff]/30 blur-3xl"></div>
                      <div className="absolute bottom-5 left-5 w-40 h-40 rounded-full bg-[#ff33ff]/20 blur-3xl"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#ff00ff]/15 blur-3xl"></div>
                    </div>
                    
                    <div className="bg-[#210021] backdrop-blur-lg rounded-xl p-5 md:p-8 relative z-10 about-card-gradient">
                      {/* This is the original shine effect that was already here */}
                      <div className="shine-effect"></div>
                      
                      {/* Existing about section content */}
                      <div className="flex flex-col md:flex-row items-center justify-between md:gap-6 lg:gap-8">
                        
                        <div className="flex-shrink-0 md:w-2/5 flex flex-col justify-center items-center md:items-center mb-6 md:mb-0">
                          <div className="w-24 h-24 md:w-28 md:h-28 border-2 border-[#ff00ff]/30 rounded-full flex items-center justify-center mb-6 bg-gradient-to-br from-[#ff00ff]/10 via-[#ff33ff]/10 to-[#cc00cc]/10 animate-border-pulse">
                            <Image
                              className="rounded-full"
                              src="/image/logo.webp"
                              alt="CleanBoosts Logo"
                              width={250}
                              height={250}
                              style={{
                                width: '100%',
                                height: 'auto',
                                filter: 'drop-shadow(0px 0px 8px rgba(255, 0, 255, 0.7))'
                              }}
                              quality={100}
                              priority
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-1 w-full">
                            <div className="text-center flex flex-col items-center">
                              <div className="text-3xl md:text-4xl font-bold text-[#ff00ff]">3+</div>
                              <div className="text-xs md:text-sm text-gray-300">Years Active</div>
                            </div>
                            <div className="text-center flex flex-col items-center">
                              <div className="text-3xl md:text-4xl font-bold text-[#ff00ff]">100K+</div>
                              <div className="text-xs md:text-xs text-gray-300">Products and Service Completed</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-grow md:w-3/5 text-center py-6 md:text-left">
                          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">Preferred by Thousands</h3>
                          
                          <div className="w-48 h-1 bg-gradient-to-r from-[#ff00ff] via-[#ff33ff] to-transparent rounded-full mb-4 mx-auto md:mx-0"></div>
                          
                          <p className="text-gray-200 text-sm md:text-base mb-4">
                            For over <span className="text-[#ff00ff] font-semibold">3 years</span>, CleanBoosts has been delivering premium Discord services with unmatched reliability and quality. With <span className="text-[#ff00ff] font-semibold">5,000+ customers</span> and <span className="text-[#ff00ff] font-semibold">1000+ vouches</span>, our reputation speaks for itself.
                          </p>
                          
                          <p className="text-gray-200 text-sm md:text-base">
                            We pride ourselves on our dedication to customer satisfaction, fast delivery times, and exceptional service. When you choose CleanBoosts, you&apos;re selecting a partner with a proven track record of excellence in the Discord community.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          
            {/* Products Section */}
            <section id="products" className="py-12 bg-transparent relative" data-aos="fade-up">
              {/* Straight diamond background with reduced height */}
              <DiamondBackground 
                rotation={0} 
                translateY="-10%" 
                right="0" 
                left="40%" 
                position="right center" 
                opacity={0.2}
                scale={0.5}
                height="50%"
              />
              
              <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white"
                    style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)' }}>
                  Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] animate-gradient"
                            style={{ textShadow: '0 2px 8px rgba(255, 0, 255, 0.5)' }}>Products</span>
                </h2>
                
                {/* Search Bar */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="rounded-full">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-[#210021] text-white border border-[#ff00ff]/40 rounded-full py-3 px-5 pl-12 focus:outline-none focus:ring-2 focus:ring-[#ff00ff]/50 transition-all duration-300"
                      />
                      <div className="absolute left-4 top-1/2 -translate-y-1/2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#ff00ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      {searchTerm && (
                        <button 
                          onClick={() => setSearchTerm('')}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Category Selector */}
                <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-10">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 cursor-pointer rounded-full text-sm md:text-base transition-all duration-300 ${
                        selectedCategory === category
                          ? "bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] text-white font-medium shadow-lg shadow-[#ff00ff]/20"
                          : "bg-[#310031] text-gray-300 hover:bg-[#410041] border border-[#ff00ff]/20"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
            
                {loading ? (
                  <div className="text-center text-white">Loading products...</div>
                ) : error ? (
                  <div className="text-center text-red-400">Error: {error}</div>
                ) : filteredProducts.length === 0 ? (
                  <div className="text-center py-12 text-gray-300">
                    <p>No products found matching your search criteria.</p>
                    <button 
                      onClick={() => {setSearchTerm(''); setSelectedCategory('All Products');}}
                      className="mt-4 px-6 py-2 bg-[#ff00ff]/60 hover:bg-[#ff00ff]/80 rounded-full text-white transition-all duration-300"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {filteredProducts.map((product, index) => (
                      <div
                        key={index}
                        className={`relative transform transition-all duration-700 ease-in-out hover:scale-[1.03] hover:z-10 ${product.hidden ? 'opacity-60' : ''}`}
                        data-aos="fade-up"
                        data-aos-delay={product.popular ? "100" : "0"}
                      >
                        <div className="pink-animated-border rounded-2xl h-full">
                          <div className="card-hover-effect flex flex-col h-full rounded-xl overflow-hidden shadow-xl shadow-[#ff00ff]/10 bg-[#210021] relative z-[1]">
                            {/* Shine effect */}
                            <div className="shine-effect"></div>

                            {/* Overlay effect */}
                            <div className="absolute left-1/2 bottom-[-80px] -translate-x-1/2 w-full max-w-9xl h-80 rounded-full blur-2xl opacity-50 pointer-events-none"
                                style={{
                                  background: 'radial-gradient(circle, rgba(255,0,255,0.4) 0%, rgba(255,0,255,0.1) 40%, rgba(33,1,32,0) 70%)',
                                }}>
                            </div>  

                            {/* Product Image Section */}
                            <div className="relative w-full h-48 bg-[#210021] overflow-hidden group">
                              <Image 
                                src={product.imageUrl} 
                                alt={product.title}
                                layout="fill"
                                objectFit="cover"
                                className="opacity-90 group-hover:opacity-100 transition-all duration-1000 ease-in-out transform group-hover:scale-[1.07]"
                                quality={90}
                                onError={(e) => { e.target.src = '/image/discordBot.webp'; }}
                              />

                              {/* Price tag floating on image */}
                              <div className="absolute -right-1 top-4 z-20 transition-transform duration-700 ease-in-out group-hover:translate-x-[-2px]">
                                <div className="bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] pl-4 pr-6 py-1.5 rounded-l-full shadow-lg flex items-center gap-1">
                                  {product.originalPrice > product.discountedPrice ? (
                                    <>
                                      <span className="text-xs text-white/80 line-through mr-1">
                                        {product.currency ? `${product.currency === 'usd' ? '$' : product.currency}` : '$'}
                                        {product.formattedOriginalPrice || product.originalPrice.toFixed(2)}
                                      </span>
                                      <span className="text-lg font-bold text-white">
                                        {product.currency ? `${product.currency === 'usd' ? '$' : product.currency}` : '$'}
                                        {product.formattedDiscountedPrice || product.discountedPrice.toFixed(2)}
                                      </span>
                                    </>
                                  ) : (
                                    <span className="text-lg font-bold text-white">
                                      {product.currency ? `${product.currency === 'usd' ? '$' : product.curresncy}` : '$'}
                                      {product.formattedDiscountedPrice || product.discountedPrice.toFixed(2)}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Add prominent stock badge on the top left */}
                              {product.stock !== undefined && (
                                <div className="absolute left-0 bottom-4 z-20">
                                  {product.stock === null ? (
                                    <div className="bg-gradient-to-r from-[#ff00ff] to-[#ff33ff]/20 text-white text-xs font-bold py-1.5 px-4 rounded-r-full shadow-lg flex items-center gap-1">
                                      <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></span>
                                      Always Available
                                    </div>
                                  ) : product.stock === 0 ? (
                                    <div className="bg-gradient-to-r from-[#cc0000] to-[#ff0000]/20 text-white text-xs font-bold py-1.5 px-4 rounded-r-full shadow-lg flex items-center gap-1">
                                      <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
                                      Out of Stock
                                    </div>
                                  ) : product.stock <= 10 ? (
                                    <div className="bg-gradient-to-r from-[#ff9900]/90 to-[#ffcc00]/20 text-white text-xs font-bold py-1.5 px-4 rounded-r-full shadow-lg flex items-center gap-1">
                                      <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></span>
                                      Low Stock: {product.stock}
                                    </div>
                                  ) : (
                                    <div className="bg-gradient-to-r from-[#00b300]/90 to-[#00cc00]/90 text-white text-xs font-bold py-1.5 px-4 rounded-r-full shadow-lg flex items-center gap-1">
                                      <span className="w-2 h-2 bg-white rounded-full animate-pulse mr-1"></span>
                                      In Stock
                                    </div>
                                  )}
                                </div>
                              )}

                              {/* Gradient overlay - keep this */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-90 group-hover:opacity-75 transition-opacity duration-700 ease-in-out"></div>
                            </div>

                            {/* Card divider with animated gradient */}
                            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#ff00ff]/50 to-transparent group-hover:via-[#ff00ff]/70 transition-colors duration-700 ease-in-out"></div>

                            {/* Card body with product details */}
                            <div className="px-6 pt-5 pb-6 flex-grow flex flex-col overflow-hidden rounded-b-2xl bg-[#210021]">
                              {/* Product title moved from overlay to here - with enhanced text shadow */}
                              <h3 className="text-xl font-bold text-white mb-2"
                                  style={{ 
                                    textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 0 6px rgba(255, 0, 255, 0.3)' 
                                  }}>
                                {product.title}
                              </h3>

                              <div className="mb-auto relative">
                                {product.shortDescription && (
                                  <div className="text-[#ff33ff]/90 font-medium text-sm leading-relaxed mb-2">
                                    {product.shortDescription.split('\n').map((line, i) => (
                                      <div key={i} className="flex items-center mb-1">
                                        <div className="relative mr-2 flex-shrink-0">
                                          {/* Diamond with sharper edges and shine effect */}
                                          <div className="absolute inset-0 rotate-45 bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] rounded-none w-3.5 h-3.5 transform -translate-x-[1px] -translate-y-[1px] animate-pulse shadow-sm overflow-hidden">
                                            {/* Shine effect overlay */}
                                            <div className="absolute inset-0 w-full h-full opacity-60">
                                              <div className="absolute top-0 left-[-100%] w-[400%] h-[50%] bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 animate-[shine_3s_ease-in-out_infinite]"></div>
                                            </div>
                                          </div>
                                          
                                          <div className="relative rotate-45 w-3 h-3 border border-white/50 flex justify-center items-center">
                                            <svg 
                                              xmlns="http://www.w3.org/2000/svg" 
                                              className="h-2.5 w-2.5 text-white transform -rotate-45" 
                                              viewBox="0 0 20 20" 
                                              fill="currentColor"
                                            >
                                              <path 
                                                fillRule="evenodd" 
                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" 
                                                clipRule="evenodd" 
                                              />
                                            </svg>
                                          </div>
                                        </div>
                                        <span className="text-[#ff33ff]/90">{line.trim()}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                                
                                {product.description && (
                                  <div className="mt-2">
                                    <button 
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        toggleDescription(product.id);
                                      }}
                                      className="w-full text-left py-2 px-3 bg-[#310031]/30 rounded-md border-l-2 border-[#ff00ff]/30 text-gray-200 text-sm hover:bg-[#410041]/30 transition-all duration-300 flex items-center justify-between"
                                    >
                                      <span>View Full Description</span>
                                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#ff00ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                      </svg>
                                    </button>
                                  </div>
                                )}
                                
                                {!product.shortDescription && !product.description && (
                                  <div className="flex items-center justify-center bg-[#310031]/30 rounded-md p-3 mb-3">
                                    <p className="text-gray-300 text-sm italic">
                                      No product description available
                                    </p>
                                  </div>
                                )}
                              </div>
                              
                              {/* Order quantity info if applicable */}
                              {product.minOrderQuantity > 1 && (
                                <div className="mt-3 text-xs text-gray-400">
                                  Min order: {product.minOrderQuantity} {product.minOrderQuantity > 1 ? 'items' : 'item'}
                                </div>
                              )}
                              
                              {/* Buy product button */}
                              <button
                                className={`w-full mt-6 relative overflow-hidden rounded-lg bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] transform hover:translate-y-[-2px] ${
                                  (product.stock === 0 || product.hidden) ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                                onClick={() => handlePurchase(product)}
                                disabled={product.stock === 0 || product.hidden}
                              >
                                <span className="absolute cursor-pointer inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"></span>
                                {product.stock === 0 ? 'Out of Stock' : product.hidden ? 'Unavailable' : 'Buy Product'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </section>
              
            {/* Why Choose Section */}
            <section id="advantages" className="py-16 bg-transparent relative" data-aos="fade-up">
              <DiamondBackground
                className="hidden md:block" 
                rotation={0} 
                translateY="-5%" 
                left="10%" 
                position="left center" 
                opacity={0.7}
                scale={1.2}
                height="30%"
              />
              
              <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white"
                    style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)' }}>
                  Why <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] animate-gradient"
                            style={{ textShadow: '0 2px 8px rgba(255, 0, 255, 0.5)' }}>CleanBoosts</span>?
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Card 1 - Easy Payment */}
                  <div className="pink-animated-border rounded-xl" data-aos="fade-up">
                    <div className="card-hover-effect h-full rounded-xl p-6 text-center" style={{ backgroundColor: "#210021", background: "#210021" }}>
                      <div className="shine-effect"></div>
                      
                      {/* Adjusted container to allow overflow and proper positioning */}
                      <div className="relative w-16 h-16 mx-auto mb-4" style={{ overflow: 'visible' }}>
                        {/* Circle background behind the image */}
                        <div className="absolute inset-0 border border-[#ff00ff]/30 rounded-full bg-gradient-to-br from-[#ff00ff]/10 via-[#ff33ff]/10 to-[#cc00cc]/10 animate-border-pulse"></div>
                        
                        {/* Image with hover effect that expands beyond the container */}
                        <div className="absolute inset-0 flex items-center justify-center transition-transform duration-300 group-hover:scale-125">
                          <Image
                            src="/image/pinkCard.png"
                            alt="Easy Payment"
                            width={100}
                            height={100}
                            className="w-20 h-20 object-contain transition-all duration-300 hover:scale-125"
                            style={{ 
                              transform: 'scale(1)',
                            }}
                          />
                        </div>
                      </div>
                      
                      <h3 className="text-lg font-semibold mb-2 text-white"
                          style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.7)' }}>Easy Payment</h3>
                      <p className="text-gray-300 text-sm">Ordering from us is simple. We accept all major cryptocurrencies, Cash App, PayPal, Venmo, credit cards, and gift cards for your convenience.</p>
                    </div>
                  </div>
                  
                  {/* Card 2 - Affordable Prices */}
                  <div className="pink-animated-border rounded-xl" data-aos="fade-up" data-aos-delay="100">
                    <div className="card-hover-effect h-full rounded-xl p-6 text-center" style={{ backgroundColor: "#210021", background: "#210021" }}>
                      <div className="shine-effect"></div>
                      <div className="w-16 h-16 border border-[#ff00ff]/30 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-[#ff00ff]/10 via-[#ff33ff]/10 to-[#cc00cc]/10 animate-border-pulse">
                        <Image
                          src="/image/pinkDollar.png"
                          alt="Affordable Prices"
                          width={100}
                          height={100}
                          className="w-20 h-20 object-contain transition-all duration-300 hover:scale-125"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-white">Affordable Prices</h3>
                      <p className="text-gray-300 text-sm">Access top-tier services at unmatched prices without sacrificing quality.</p>
                    </div>
                  </div>
                  
                  {/* Card 3 - Legal Methods */}
                  <div className="pink-animated-border rounded-xl" data-aos="fade-up" data-aos-delay="200">
                    <div className="card-hover-effect h-full rounded-xl p-6 text-center" style={{ backgroundColor: "#210021", background: "#210021" }}>
                      <div className="shine-effect"></div>
                      <div className="w-16 h-16 border border-[#ff00ff]/30 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-[#ff00ff]/10 via-[#ff33ff]/10 to-[#cc00cc]/10 animate-border-pulse">
                        <Image
                          src="/image/pinkShield.png"
                          alt="Legal Methods"
                          width={100}
                          height={100}
                          className="w-16 h-16 object-contain transition-all duration-300 hover:scale-125"
                          style={{ 
                            transform: 'scale(0.9)',
                          }}
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-white">Legal Methods</h3>
                      <p className="text-gray-300 text-sm">Rest easy knowing that all our services are obtained through legal channels. We prioritize your peace of mind and security without concerns about reversals or legality.</p>
                    </div>
                  </div>
                  
                  {/* Card 4 - 24/7 Support */}
                  <div className="pink-animated-border rounded-xl" data-aos="fade-up">
                    <div className="card-hover-effect h-full rounded-xl p-6 text-center" style={{ backgroundColor: "#210021", background: "#210021" }}>
                      <div className="shine-effect"></div>
                      <div className="w-16 h-16 border border-[#ff00ff]/30 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-[#ff00ff]/10 via-[#ff33ff]/10 to-[#cc00cc]/10 animate-border-pulse">
                        <Image
                          src="/image/purpleChat.png"
                          alt="24/7 Support"
                          width={100}
                          height={100}
                          className="w-16 h-16 object-contain transition-all duration-300 hover:scale-125"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-white">24/7 Support</h3>
                      <p className="text-gray-300 text-sm">Our exceptional chat support is available 24/7 to address any questions or concerns you may have every day.</p>
                    </div>
                  </div>
                  

                            <div className="pink-animated-border rounded-xl" data-aos="fade-up" data-aos-delay="100">
                            <div className="card-hover-effect h-full rounded-xl p-6 text-center" style={{ backgroundColor: "#210021", background: "#210021" }}>
                              <div className="shine-effect"></div>
                              <div className="w-16 h-16 border border-[#ff00ff]/30 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-[#ff00ff]/10 via-[#ff33ff]/10 to-[#cc00cc]/10 animate-border-pulse">
                              <Image
                                src="/image/purplestar.png"
                                alt="Trusted Reputation"
                                width={100}
                                height={100}
                                className="w-16 h-16 object-contain transition-all duration-300 hover:scale-125"
                                style={{ 
                                transform: 'scale(1.1)',
                                }}
                              />
                              </div>
                              <h3 className="text-lg font-semibold mb-2 text-white">Trusted Reputation</h3>
                              <p className="text-gray-300 text-sm">With consistent 5-star ratings from our satisfied customers, we&apos;re the trusted choice for premium services, supported by a strong reputation for excellence and reliability.</p>
                            </div>
                            </div>
                            
                            {/* Card 6 - Automatic Delivery */}
                  <div className="pink-animated-border rounded-xl" data-aos="fade-up" data-aos-delay="200">
                    <div className="card-hover-effect h-full rounded-xl p-6 text-center" style={{ backgroundColor: "#210021", background: "#210021" }}>
                      <div className="shine-effect"></div>
                      <div className="w-16 h-16 border border-[#ff00ff]/30 rounded-full flex items-center justify-center mx-auto mb-4 bg-gradient-to-br from-[#ff00ff]/10 via-[#ff33ff]/10 to-[#cc00cc]/10 animate-border-pulse">
                        <Image
                          src="/image/purpleBag.png"
                          alt="Automatic Delivery"
                          width={80}
                          height={80}
                          className="w-16 h-16 object-contain transition-all duration-300 hover:scale-125"
                          style={{ 
                            transform: 'scale(0.8)',
                          }}
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-white">Automatic Delivery</h3>
                      <p className="text-gray-300 text-sm">Obtain what you need in under 30 seconds with our fast delivery system, ensuring immediate access to our premium services without delay.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <DiamondBackground 
                rotation={0} 
                translateY="260%" 
                left="100%" 
                position="left center" 
                opacity={0.3}
                scale={1.2}
                height="30%"
              />
            </section>
      
            {/* Testimonials Section */}
            <section id="reviews" className="py-16 bg-transparent relative" data-aos='fade-up'>
              <DiamondBackground 
                rotation={0} 
                translateY="-120%" 
                right="45%" 
                left="auto" 
                bottom="0" 
                top="auto" 
                position="center bottom" 
                opacity={0.5}
                scale={1.2}
                height="40%"
              />
              <OptimizedTestimonials  onViewProof={handleViewProof} />
            </section>
      
            {/* Contact Us Section */}
            <section id="contact" className="pb-16 bg-transparent relative" data-aos="fade-up">
              <div className="container mx-auto px-6 relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white"
                    style={{ textShadow: '0 2px 6px rgba(0, 0, 0, 0.5)' }}>
                  Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] animate-gradient"
                              style={{ textShadow: '0 2px 8px rgba(255, 0, 255, 0.5)' }}>Us</span>
                </h2>
                
                <p className="text-center text-gray-300 max-w-2xl mx-auto mb-8"
                   style={{ textShadow: '0 1px 2px rgba(0, 0, 0, 0.7)' }}>
                  Have questions or need assistance? Our team is available 24/7 to provide support and answer any inquiries about our services.
                </p>
                
                {/* Contact cards container with fixed width and centered alignment */}
                <div className="w-full mx-auto contact-border">
                  <div className="rounded-xl overflow-hidden">
                    <div className="rounded-xl p-12 bg-[#210021] flex flex-col sm:flex-row justify-center items-stretch gap-6 contact-card-gradient">
                      
                      {/* Discord Button - fixed dimensions */}
                      <div className="w-full sm:w-[260px] card-hover-effect rounded-xl overflow-hidden">
                        <div className="p-4 border border-[#ff00ff] rounded-xl bg-[#210021] bg-[linear-gradient(rgba(33,0,33,0.8),rgba(33,0,33,0.7)),url(/image/cardbg.jpg)] bg-cover h-full flex flex-col items-center justify-center">
                          <div className="shine-effect"></div>
                          <div className="w-16 h-16 bg-[#210021] border border-[#ff00ff] rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-[#ff00ff]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.393-.403.85-.548 1.235a16.618 16.618 0 0 0-4.98 0 9.664 9.664 0 0 0-.554-1.235.077.077 0 0 0-.079-.036 19.146 19.146 0 0 0-4.885 1.49.07.07 0 0 0-.032.028C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 19.382 19.382 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.995a.076.076 0 0 0-.041-.106 12.786 12.786 0 0 1-1.87-.892.077.077 0 0 1-.008-.128 10.052 10.052 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.35 12.35 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.32 19.32 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.278c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-white">Discord</h3>
                          <p className="text-gray-300 text-sm mb-4 text-center">Join our Discord community for instant support</p>
                          <a 
                            href="https://discord.cleanboosts.com" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-2.5 bg-[#ff00ff] rounded-full text-white font-medium hover:shadow-lg hover:shadow-[#5865F2]/30 transition-all duration-300"
                          >
                            Join Now
                          </a>
                        </div>
                      </div>
                      
                      {/* Telegram Button - fixed dimensions to match Discord card */}
                      <div className="w-full sm:w-[260px] card-hover-effect rounded-xl overflow-hidden bg-cover">
                        <div className="p-4 border border-[#ff00ff] rounded-xl bg-[#210021] bg-[linear-gradient(rgba(33,0,33,0.8),rgba(33,0,33,0.7)),url(/image/cardbg.jpg)] bg-cover  h-full flex flex-col items-center justify-center">
                          <div className="shine-effect"></div>
                          <div className="w-16 h-16 bg-[#210021] border border-[#ff00ff] rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-[#ff00ff]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321 0.023.465 0.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                            </svg>
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-white">Telegram</h3>
                          <p className="text-gray-300 text-sm mb-4 text-center">Chat with us directly on Telegram</p>
                          <a 
                            href="https://t.me/cleanboosts" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-block px-6 py-2.5 bg-[#ff00ff] rounded-full text-white font-medium hover:shadow-lg hover:shadow-[#0088cc]/30 transition-all duration-300"
                          >
                            Message Us
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
      
            {/* Add Proof Modal */}
            {proofModalOpen && (
              <div className="fixed inset-0 z-[99] flex items-center justify-center" onClick={closeProofModal}>
                <div className="absolute inset-0 bg-black/80 backdrop-blur-sm"></div>
                <div 
                  className="relative z-10 max-w-4xl w-full mx-4 md:mx-auto glass-card-moving-border rounded-xl p-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="bg-[#0f0f0f] rounded-xl p-6 relative">
                    <button 
                      onClick={closeProofModal} 
                      className="absolute cursor-pointer top-4 right-4 text-white/70 hover:text-white bg-[#ff00ff]/20 hover:bg-[#ff00ff]/40 rounded-full p-2 transition-all duration-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    <div className="pt-6">
                      <h3 className="text-2xl font-bold text-center mb-6 text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#ff33ff]">
                          Verification Proof 
                        </span>
                      </h3>
                      
                      <div className="flex justify-center mb-6">
                        <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent rounded-full"></div>
                      </div>
                      
                        <div className="max-h-[70vh] z-[99] overflow-y-auto">
                          {currentProof && (
                            <div className="space-y-4">
                              {currentProof.includes('/avatars-vouches/') || currentProof.includes('.png') || currentProof.includes('.jpg') || currentProof.includes('.jpeg') || currentProof.includes('.gif') ? (
                                // If it's an image
                                <div className="flex justify-center">
                                  <Image 
                                    src={currentProof} 
                                    alt="Proof" 
                                    width={800} 
                                    height={600}
                                    className="max-w-full h-auto rounded-lg border border-[#ff00ff]/20"
                                    objectFit="contain"
                                  />
                                </div>
                              ) : currentProof.includes('http') ? (
                                // If it's a URL
                                <div>
                                  <p className="text-gray-300 mb-2">Verification Link:</p>
                                  <a 
                                    href={currentProof} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-[#ff00ff] hover:text-[#ff33ff] underline break-all"
                                  >
                                    {currentProof}
                                  </a>
                                </div>
                              ) : (
                                // If it's just text
                                <p className="text-gray-300">{currentProof}</p>
                              )}
                              <div className="text-center mt-6 mb-2">
                                <p className="text-sm text-gray-400">This verification proof confirms that this review is authentic.</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* Checkout Modal */}
              <CheckoutModal
                product={selectedProduct}
                isOpen={isModalOpen}
                onClose={closeModal}
              />

              {/* Description Modal - Only shown when a description is expanded */}
              {Object.entries(expandedDescriptions).some(([id, expanded]) => expanded) && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-black/85 backdrop-blur-md" 
                    onClick={() => {
                      const expandedId = Object.entries(expandedDescriptions)
                        .find(([id, expanded]) => expanded)?.[0];
                      if (expandedId) toggleDescription(expandedId);
                    }}
                  ></div>
                  
                  <div 
                    className="relative z-50 w-[95%] max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl h-auto max-h-[92vh] rounded-xl overflow-hidden shadow-[0_0_30px_5px_rgba(255,0,255,0.4)] animate-fadeIn border border-[#ff00ff]/30"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Get the expanded product */}
                    {(() => {
                      const expandedId = Object.entries(expandedDescriptions)
                        .find(([id, expanded]) => expanded)?.[0];
                      const product = filteredProducts.find(p => p.id === expandedId);
                      
                      return product ? (
                        <>
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
                            {/* Product image banner - improved height and responsiveness */}
                            <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 bg-[#210021] overflow-hidden">
                              <Image 
                                src={product.imageUrl} 
                                alt={product.title}
                                layout="fill"
                                objectFit="contain" 
                                className="object-contain opacity-95 hover:opacity-100 transition-all duration-700 ease-in-out p-2"
                                quality={100}
                                onError={(e) => { e.target.src = '/image/discordBot.webp'; }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-70"></div>
                              
                              {/* Price tag floating on image */}
                              <div className="absolute top-4 right-4 bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] px-4 py-2 rounded-lg text-white font-bold text-xl shadow-lg shadow-[#ff00ff]/30">
                                {product.currency ? `${product.currency === 'usd' ? '$' : product.currency}` : '$'}
                                {product.formattedDiscountedPrice || product.discountedPrice.toFixed(2)}
                              </div>
                            </div>
                            
                            {/* Product details section - improved readability */}
                            <div className="p-6 sm:p-8">
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
                              <div className="sticky bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f] to-[#0f0f0f]/90 pt-4 pb-6">
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
                        </>
                      ) : null;
                    })()}
                  </div>
                </div>
              )}
            </div>
            <Footer />
          </AuroraBackground>
        )}
      </>
    );
  }