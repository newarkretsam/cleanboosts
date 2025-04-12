'use client'

import { useState, useEffect } from 'react';

/**
 * CheckoutModal Component
 * A reusable modal component for product checkout using an iframe
 * 
 * @param {Object} props - Component props
 * @param {Object} props.product - Product to checkout
 * @param {boolean} props.isOpen - Whether the modal is open
 * @param {function} props.onClose - Function to call when closing the modal
 * @param {string} props.sellHubBaseUrl - Base URL for SellHub checkout
 */

export default function CheckoutModal({ 
  product,
  isOpen = false,
  onClose,
  sellHubBaseUrl = 'https://cleanboosts.sellhub.cx/embed/product/'
}) {
  const [checkoutUrl, setCheckoutUrl] = useState('');
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);
  
  useEffect(() => {
    if (isOpen && product) {
      try {
        // Use product ID directly if available, otherwise fall back to variants
        let productId;
        console.log("Product data:", product);
        
        if (product.id) {
          productId = product.id;
        }
        
        if (!productId) {
          console.error("No product ID or variants available for checkout", product);
          return;
        }
        
        const url = `${sellHubBaseUrl}${productId}`;
        console.log(`Opening checkout with ID ${productId} for ${product.title}: ${url}`);
        
        setCheckoutUrl(url);
        setIsPurchaseComplete(false);
      } catch (error) {
        console.error("Error generating checkout URL:", error);
      }
    }
  }, [isOpen, product, sellHubBaseUrl]);

  // useEffect(() => {
  //   const handleMessage = (event) => {
      
  //     if (event.origin.includes('sellhub.cx')) {
  //       try {
  //         const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
          
  //         if (data.status === 'success' || data.status === 'paid' || data.status==='complete'|| data.status==='completed' || data.event === 'purchase_complete' || data.event === 'purchase_success'|| data.event === 'purchase_completed' ) {
  //           console.log('Purchase completed!', data);
  //           setIsPurchaseComplete(true);
  //         }
  //       } catch (error) {
  //         console.error('Error processing message from checkout:', error);
  //       }
  //     }
  //   };

  //   window.addEventListener('message', handleMessage);
  //   return () => window.removeEventListener('message', handleMessage);
  // }, []);

  useEffect(() => {
    if (isOpen) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  // Handle modal close and reset states
  const handleClose = () => {
    setIsPurchaseComplete(false);
    onClose();
  };

  if (!isOpen) return null;
  if (!checkoutUrl && !isPurchaseComplete) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 backdrop-blur-sm bg-black/60">
      <div className="relative w-full max-w-lg sm:max-w-2xl md:max-w-3xl lg:max-w-4xl h-[85vh] sm:h-[80vh] rounded-xl overflow-hidden shadow-[0_0_25px_5px_rgba(236,72,153,0.3)] bg-gradient-to-br from-white/10 to-white/5 backdrop-filter backdrop-blur-md border-2 border-pink-500/40 animate-border-pulse">
        <div className="flex justify-between items-center bg-gradient-to-r from-pink-500/80 via-fuchsia-600/80 to-fuchsia-900/80 backdrop-blur-sm rounded-t-sm p-1 sm:p-2 border-b border-white/20">
          <h3 className="text-sm sm:text-base md:text-lg font-bold ml-2 text-white">
            {isPurchaseComplete ? "Thank You For Your Purchase!" : `Complete Your Purchase: ${product?.title}`}
          </h3>
          <button 
            onClick={handleClose} 
            className="text-white hover:text-gray-200 focus:outline-none mr-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="w-full h-[calc(85vh-40px)] sm:h-[calc(80vh-48px)] rounded-b-xl overflow-y-hidden bg-[#0A0A0A]/80">
          {isPurchaseComplete ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center text-white">
              <div className="mb-6 text-green-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-fuchsia-600 bg-clip-text text-transparent">Thank you for your purchase!</h2>
              <p className="text-gray-300 mb-8 max-w-md">Your order for <span className="font-semibold text-pink-400">{product?.title}</span> has been successfully processed.</p>
              <p className="text-gray-400 mb-2">You&apos;ll receive a confirmation email shortly.</p>
              <button
                onClick={handleClose}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-lg font-semibold text-white hover:opacity-90 transition-opacity focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              >
                Close
              </button>
            </div>
          ) : (
            <iframe 
              src={checkoutUrl} 
              className="w-full h-full" 
              title="Checkout"
              allow="payment"
              style={{ backgroundColor: 'rgba(10, 10, 10, 0.7)' }}
            ></iframe>
          )}

        </div>
      </div>
    </div>
  );
}