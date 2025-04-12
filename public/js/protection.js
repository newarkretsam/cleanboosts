// // Additional protection script

// (function() {
//   // Prevent iframe embedding
//   if (window.top !== window.self) {
//     window.top.location.href = window.self.location.href;
//   }
  
//   // Add dynamic signature to window object
//   const signature = btoa(`CleanBoosts-${new Date().toISOString().slice(0, 10)}`);
//   Object.defineProperty(window, '_cbSiteProtection', {
//     value: signature,
//     writable: false,
//     configurable: false
//   });
  
//   // Disable common debugging functions
//   const noop = () => {};
  
//   // Override debug functions periodically
//   setInterval(function() {
//     // Make debug functions return random strings to confuse scrapers
//     const randomString = () => Math.random().toString(36).substring(2);
    
//     // Create proxies for debug functions
//     const createDebugProxy = (originalFn) => {
//       return new Proxy(originalFn || noop, {
//         apply: function(target, thisArg, args) {
//           // Allow some legitimate logging
//           if (args && args[0] && typeof args[0] === 'string' && 
//              (args[0].includes('React') || args[0].includes('Warning'))) {
//             return Reflect.apply(target, thisArg, args);
//           }
          
//           // For potential scraping attempts, return confusing information
//           if (args && args[0] && typeof args[0] === 'string') {
//             if (args[0].includes('%c')) return randomString();
//           }
          
//           return Reflect.apply(target, thisArg, args);
//         }
//       });
//     };
    
//     // Apply protection
//     if (window.console) {
//       // Preserve important console methods but proxy them
//       const originalLog = window.console.log;
//       const originalWarn = window.console.warn;
//       const originalError = window.console.error;
//       const originalClear = window.console.clear;
      
//       window.console.log = createDebugProxy(originalLog);
//       window.console.warn = createDebugProxy(originalWarn);
//       window.console.error = createDebugProxy(originalError);
//       window.console.clear = createDebugProxy(originalClear);
//     }
//   }, 2000);
  
//   // Additional obfuscation: Create dummy functions with important-sounding names
//   window._cleanBoostsPaymentProcessor = function() {
//     return Array(16).fill(0).map(() => Math.floor(Math.random() * 10)).join('');
//   };
  
//   window._cleanBoostsTokenVerifier = function() {
//     return btoa(Math.random().toString()).substring(10, 40);
//   };
// })();
