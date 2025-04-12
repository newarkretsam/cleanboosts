import React, { memo, useEffect, useState } from 'react';

const DiamondBackground = memo(({ 
  rotation = 0, 
  translateY = '-15%', 
  position = 'center', 
  opacity = 0.7,
  right = 'auto',
  left = 0,
  top = 0,
  bottom = 'auto',
  scale = 1,
  debug = false,
  height = '120%',
  className = '',
}) => {
  const [mounted, setMounted] = useState(false);
  
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleMotionPreferenceChange = (event) => {
        setPrefersReducedMotion(event.matches);
      };
      
      mediaQuery.addEventListener('change', handleMotionPreferenceChange);
      
      return () => {
        mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
      };
    }
  }, []);

  if (!mounted) return null;
  
  const backgroundImage = prefersReducedMotion 
    ? 'url(/image/diamond-static.png)'
    : 'url(/image/diamond.webp)';
  
  return (  
    <div 
      className={`diamond-bg ${className} hardware-accelerated`}
      style={{
        position: 'absolute',
        transform: `translateY(${translateY}) rotate(${rotation}deg) scale(${scale})`,
        top,
        bottom,
        left,
        right,
        width: '100%', 
        height,
        backgroundImage,
        backgroundSize: 'contain',
        backgroundPosition: position,
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
        opacity: prefersReducedMotion ? opacity * 0.5 : opacity,
        pointerEvents: 'none',
        border: debug ? '2px solid red' : 'none',
        willChange: 'transform, opacity',
      }} 
      aria-hidden="true" 
    />
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.opacity === nextProps.opacity &&
    prevProps.scale === nextProps.scale &&
    prevProps.translateY === nextProps.translateY &&
    prevProps.rotation === nextProps.rotation &&
    prevProps.className === nextProps.className &&
    prevProps.left === nextProps.left &&
    prevProps.right === nextProps.right &&
    prevProps.top === nextProps.top &&
    prevProps.bottom === nextProps.bottom
  );
});

// Set displayName for better debugging
DiamondBackground.displayName = 'DiamondBackground';

export default DiamondBackground;
