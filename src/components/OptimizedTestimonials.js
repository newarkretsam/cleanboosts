import React, { useState, useEffect, useRef, memo, useMemo } from 'react';
import Image from "next/image";
import useOptimizedVouches from "@/hooks/useOptimizedVouches";

const sampleVouches = [
  {
    discord_avatar: "",
    discord_name: "ServerAdmin",
    discord_id: "123456789",
    content: "Fast, reliable service that helped our community server reach Level 3 in record time. The boosts were delivered instantly and support was incredibly helpful with all my questions.",
    stars: "5",
    date: "2024-03-04 09:15:30"
  },
  {
    discord_avatar: "",
    discord_name: "TechModerator",
    discord_id: "987654321",
    content: "I've used many Discord boost providers before, but CleanBoosts is by far the best. Prices are competitive, the process was simple, and my server got the boosts within minutes. Will definitely use again!",
    stars: "5",
    date: "2024-03-03 14:22:45"
  }
];

// Embedded VouchCard component (previously separate)
const VouchCard = memo(({ vouch, onViewProof }) => {
  return (
    <div className='pink-animated-border m-0.5'>
      <div className=" testimonial-bg-purple card-hover-effect p-4 sm:p-6 relative flex flex-col">
        <div className="shine-effect"></div>
      
        {/* Quote icon - smaller on mobile */}
        <div className="absolute top-3 sm:top-4 right-3 sm:right-4 opacity-20 scale-75 sm:scale-100">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 sm:h-12 w-10 sm:w-12 text-[#ff00ff]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
        </div>
      
        {/* Stars based on rating */}
        <div className="flex mb-2 sm:mb-3 ">
          {[...Array(5)].map((_, i) => (
            <svg
              key={i}
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 sm:h-5 sm:w-5 ${i < parseInt(vouch.stars) ? 'text-[#ff00ff]' : 'text-[#ff00ff]/30'}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      
        {/* Testimonial text with truncation - adjusted height for mobile */}
        <div className="h-20 sm:h-24 overflow-hidden relative mt-4 sm:mt-6">
          <p className="text-sm sm:text-base text-gray-200 italic line-clamp-3">
            &quot;{vouch.content}&quot;
          </p>
          {vouch.content.length > 100 && (
            <div className="absolute bottom-5 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent"></div>
          )}
        </div>
      
        {/* Flex spacer */}
        <div className="flex-grow min-h-[16px] sm:min-h-[20px]"></div>
      
        {/* Customer info section - more compact on mobile */}
        <div className="flex items-center w-full mb-3 sm:mb-5">
          <div className="flex-shrink-0">
            {vouch.discord_avatar ? (
              <Image
                src={vouch.discord_avatar}
                alt={vouch.discord_name}
                width={48}
                height={48}
                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-[#ff00ff]/30"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : (
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#ff00ff]/20 to-[#ff33ff]/20 flex items-center justify-center border border-[#ff00ff]/30">
                <span className="text-lg sm:text-xl font-bold text-[#ff00ff]">{vouch.discord_name?.charAt(0) || "U"}</span>
              </div>
            )}
          </div>
      
          <div className="ml-3 flex-1 overflow-hidden">
            <h4 className="text-sm sm:text-base text-white font-semibold truncate">{vouch.discord_name}</h4>
            <p className="text-xs sm:text-sm text-gray-400">{vouch.formattedDate || vouch.date}</p>
          </div>
        </div>
      
        {/* Proof button */}
        {vouch.proof && (
          <button
            onClick={() => onViewProof(vouch.proof)}
            className="w-full cursor-pointer bg-gradient-to-r text-white from-[#ff00ff] to-[#ff33ff] border border-[#ff00ff]/30 hover:border-[#ff00ff] hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] transform hover:translate-y-[-2px] flex items-center justify-center space-x-1.5 text-xs sm:text-sm py-2.5 sm:py-3 rounded-md transition-all duration-300 hover:bg-[#ff00ff]/10"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>View Proof</span>
          </button>
        )}
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.vouch.id === nextProps.vouch.id &&
    prevProps.vouch.content === nextProps.vouch.content &&
    prevProps.vouch.discord_name === nextProps.vouch.discord_name
  );
});

VouchCard.displayName = 'VouchCard';

const OptimizedTestimonials = memo(({ onViewProof }) => {
  const { vouches, duplicateVouches, loading, error } = useOptimizedVouches(sampleVouches, 5);
  
  const scrollContainerRef = useRef(null);
  const scrollWrapperRef = useRef(null);
  
  const animationRef = useRef(null);
  
  const scrollPosition = useRef(0);
  
  const [forceUpdate, setForceUpdate] = useState(0);
  
  const enhancedVouches = useMemo(() => {
    // Always use sample vouches initially, then replace with fetched data
    const vouchesToUse = !vouches.length && loading ? sampleVouches : vouches;
    
    // Create THREE complete sets of items to ensure we never run out
    const sets = [];
    for (let i = 0; i < 6; i++) {
      vouchesToUse.forEach((vouch, index) => {
        sets.push({
          ...vouch,
          _uniqueKey: `set-${i}-item-${index}-${Math.random().toString(36).substring(2, 9)}`,
        });
      });
    }
    return sets;
  }, [vouches, loading]);
  
  // Restart the animation completely
  const restartAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    
    // Reset position
    scrollPosition.current = 0;
    
    // Force component update
    setForceUpdate(prev => prev + 1);
    
    // Restart with delay to ensure DOM is updated
    setTimeout(() => {
      const container = scrollContainerRef.current;
      if (!container) return;
      container.style.transform = 'translateX(0)';
      startAnimation();
    }, 50);
  };
  
  // Start animation function
  const startAnimation = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    // Calculate first set width - only the width of ONE complete set of vouches
    const firstItem = container.querySelector('.infinite-carousel-item');
    const itemWidth = firstItem ? firstItem.offsetWidth : 400;
    const singleSetWidth = itemWidth * vouches.length;
    
    let lastTimestamp = 0;
    // Adjust speed based on screen width
    const scrollSpeed = window.innerWidth < 768 ? 0.02 : 0.03;
    
    const animate = (timestamp) => {
      if (!lastTimestamp) {
        lastTimestamp = timestamp;
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Calculate time delta
      const elapsed = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      // Update position
      scrollPosition.current += scrollSpeed * elapsed;
      
      // Critical: Reset position precisely when we've scrolled one set
      if (scrollPosition.current >= singleSetWidth) {
        // Reset to beginning
        scrollPosition.current = scrollPosition.current - singleSetWidth;
      }
      
      // Apply transform with integer pixels for performance
      container.style.transform = `translateX(-${Math.floor(scrollPosition.current)}px)`;
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
  };
  
  // Initialize or restart animation when vouches change
  useEffect(() => {
    // Always start animation even if loading (using sample data)
    if (error || !enhancedVouches.length) return;
    restartAnimation();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [enhancedVouches, error]);
  
  // Add pause/resume handlers
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
    
    // Handle resize events to ensure animation stays consistent
    const handleResize = () => {
      restartAnimation();
    };
    
    // Only add resize handler with debounce
    let resizeTimer;
    const debouncedResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(handleResize, 200);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    return () => {
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimer);
    };
  }, [forceUpdate, vouches]);
  
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-transparent overflow-hidden relative">
      <div className="container px-4 sm:px-6 mx-auto relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-3 md:mb-4 text-white">
          Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] animate-gradient">Reviews</span>
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base text-center max-w-3xl mx-auto mb-3">
          See what our clients have to say about their experience with our services. We pride ourselves on delivering exceptional quality and support.
        </p>
        
        <div className="relative">
        {error ? (
            <div className="text-center py-4">
              <p className="text-gray-300 text-sm">Loading latest reviews...</p>
            </div>
          ) : (
            <div 
              ref={scrollWrapperRef}
              className="infinite-carousel-container overflow-hidden w-full"
              style={{ 
                position: 'relative',
                zIndex: 10
              }}
            >
              <div 
                ref={scrollContainerRef}
                className="flex touch-pan-y"
                style={{ 
                  willChange: 'transform',
                  minWidth: 'max-content',
                }}
              >
                {enhancedVouches.map((vouch) => (
                  <div 
                    key={vouch._uniqueKey}
                    className="infinite-carousel-item w-[85vw] sm:w-[350px] md:w-[350px] lg:w-[400px]"
                    style={{ flexShrink: 0, padding: '0 8px' }}
                  >
                    <div className="rounded-xl p-3 sm:p-4 md:p-6 overflow-hidden">
                      <VouchCard vouch={vouch} onViewProof={onViewProof} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
});

OptimizedTestimonials.displayName = 'OptimizedTestimonials';

export default OptimizedTestimonials;
