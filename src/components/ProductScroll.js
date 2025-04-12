import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from "next/image";
import Link from "next/link";

const ProductScroll = () => {
  const staticServices = [
    {
      id: 1,
      title: "Discord Server Boosts",
      description: "Premium server boosts at discounted rates",
      price: "9.99",
      originalPrice: "19.99",
      imageUrl: "/image/boost2.png"
    },
    {
      id: 2,
      title: "Nitro Tokens",
      description: "Reliable Nitro tokens with secure delivery",
      price: "12.99",
      originalPrice: "24.99",
      imageUrl: "/image/wumpus.png"
    },
    {
      id: 3,
      title: "Discord Decorations",
      description: "Decorative items for your server",
      price: "7.99",
      originalPrice: "15.99",
      imageUrl: "/image/dcDecoo.png"
    },
    {
      id: 5,
      title: "Discord Accounts",
      description: "Expert Discord assistance & consultations",
      price: "19.99",
      originalPrice: "39.99",
      imageUrl: "/image/DCacc.png"
    }
  ];
  
  // Create a stable version of the services with fixed keys
  const enhancedServices = useMemo(() => {
    return [...staticServices, ...staticServices, ...staticServices, ...staticServices].map((service, idx) => ({
      ...service,
      _uniqueKey: `service-${service.id}-${idx}`  // More stable keys
    }));
  }, []);
  
  // Track hover state with one variable instead of array
  const [hoveredKey, setHoveredKey] = useState(null);
  
  const scrollContainerRef = useRef(null);
  const animationRef = useRef(null);
  const scrollPosition = useRef(0);
  const containerWidth = useRef(0);
  const itemsWidthRef = useRef(0);
  
  // Measure the actual width of the items after mount
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !container.firstChild) return;
    
    // Get actual width of the first set of items
    itemsWidthRef.current = container.firstChild.offsetWidth * staticServices.length;
    containerWidth.current = itemsWidthRef.current;
  }, []);
  
  // Optimized scroll animation
  const startAnimation = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    let lastTimestamp = 0;
    const scrollSpeed = 0.02; // Reduce speed for smoother animation
    
    const animate = (timestamp) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      const elapsed = Math.min(timestamp - lastTimestamp, 50); // Cap at 50ms
      lastTimestamp = timestamp;
      
      // Only update position if we have measured the width
      if (containerWidth.current > 0) {
        scrollPosition.current += scrollSpeed * elapsed;
        
        if (scrollPosition.current >= containerWidth.current) {
          scrollPosition.current = 0;
        }
        
        container.style.transform = `translateX(-${Math.floor(scrollPosition.current)}px)`;
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  useEffect(() => {
    let container = scrollContainerRef.current;
    
    if (container) {
      container.style.transform = 'translateX(0)';
      
      // Start animation after a small delay to ensure layout is complete
      const timer = setTimeout(() => {
        startAnimation();
      }, 100);
      
      return () => {
        clearTimeout(timer);
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }
  }, []);
  
  // Separate the mouse handlers for better performance
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    const handleMouseEnter = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
    
    const handleMouseLeave = () => {
      if (!animationRef.current) {
        startAnimation();
      }
    };
    
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div className="relative z-10 py-6 overflow-hidden mx-auto w-full max-w-[1920px]">
      <div className="text-center">
        <h3 className="text-lg font-bold text-gray-300 tracking-wide uppercase">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#ff33ff]">
            Our Services
          </span>
        </h3>
      </div>
      
      <div className="infinite-carousel-container w-full md:w-4/5 lg:w-3/4 mx-auto overflow-hidden px-4"
        style={{ perspective: '800px' }}>
        <div 
          ref={scrollContainerRef}
          className="flex" 
          style={{ 
            willChange: 'transform',
            transformStyle: 'preserve-3d',
            minWidth: 'max-content',
          }}
        >
          {enhancedServices.map((service) => (
            <OptimizedServiceItem 
              key={service._uniqueKey}
              service={service} 
              isHovered={hoveredKey === service._uniqueKey}
              onHover={() => setHoveredKey(service._uniqueKey)}
              onBlur={() => setHoveredKey(null)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Simplified service item with reduced animations
// Simplified service item with reduced animations
const OptimizedServiceItem = React.memo(({ service, isHovered, onHover, onBlur }) => {
  const containerRef = useRef(null);
  const iconRef = useRef(null);
  const titleRef = useRef(null);
  
  // Apply hover styles directly without animation frames
  useEffect(() => {
    if (isHovered) {
      if (iconRef.current) {
        iconRef.current.style.transform = 'translateZ(30px) scale(1.5)';
        iconRef.current.style.transition = 'transform 0.3s ease';
      }
      if (containerRef.current) {
        containerRef.current.style.boxShadow = '0 0 15px rgba(255,0,255,0.5)';
        containerRef.current.style.borderColor = 'rgba(255,0,255,0.5)';
      }
      if (titleRef.current) {
        titleRef.current.style.transform = 'translateZ(15px)';
      }
    } else {
      if (iconRef.current) {
        iconRef.current.style.transform = 'translateZ(10px) scale(1.2)';
        iconRef.current.style.transition = 'transform 0.3s ease';
      }
      if (containerRef.current) {
        containerRef.current.style.boxShadow = '0 0 8px rgba(255,0,255,0.2)';
        containerRef.current.style.borderColor = 'rgba(255,0,255,0.2)';
      }
      if (titleRef.current) {
        titleRef.current.style.transform = 'translateZ(5px)';
      }
    }
  }, [isHovered]);

  return (
    <Link href="#products" className="flex-shrink-0 mx-3">
      <div 
        ref={containerRef}
        className="service-item relative flex items-center space-x-3 bg-gradient-to-br from-[#210021]/80 to-[#180018]/80 border border-[#ff00ff]/20 hover:border-[#ff00ff]/50 rounded-full px-4 py-2 transition-all duration-300"
        style={{ 
          transformStyle: 'preserve-3d',
          boxShadow: '0 0 8px rgba(255,0,255,0.2)',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
        }}
        onMouseEnter={onHover}
        onMouseLeave={onBlur}
      >
        <div 
          className="relative flex-shrink-0 w-8 h-8 rounded-full border border-[#ff00ff] flex items-center justify-center"
          style={{ 
            transformStyle: 'preserve-3d',
            overflow: 'visible'
          }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] opacity-30"></div>
          
          <div 
            ref={iconRef}
            style={{ 
              transformStyle: 'preserve-3d',
              transform: 'translateZ(10px) scale(1.2)',
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'transform 0.3s ease'
            }}
          >
            <Image 
              src={service.imageUrl}
              alt={service.title}
              width={100}
              height={100}
              className="relative z-10"
              onError={(e) => {
                console.error(`Failed to load image for service: ${service.title}`);
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>
        
        <span 
          ref={titleRef}
          className="text-white text-sm whitespace-nowrap"
          style={{ 
            transformStyle: 'preserve-3d',
            transform: 'translateZ(5px)',
            transition: 'transform 0.3s ease'
          }}
        >
          {service.title}
        </span>
      </div>
    </Link>
  );
}, (prevProps, nextProps) => {
  return prevProps.isHovered === nextProps.isHovered && 
         prevProps.service.id === nextProps.service.id;
});

// Add this line to fix the error
OptimizedServiceItem.displayName = 'OptimizedServiceItem';

export default ProductScroll;