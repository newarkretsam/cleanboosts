import { useEffect, useState } from 'react';
import {
  detectDevTools,
  blockDevToolsKeys,
  disableRightClick,
  showDevToolsWarning,
  applyDevToolsObscuring,
  cleanupAntiSkid
} from '@/utils/antiSkid';

/**
 * Custom hook to add anti-skid protection to the application
 * @param {Object} options - Configuration options
 * @param {boolean} options.disableSelection - Disable text selection
 * @param {boolean} options.disableContextMenu - Disable right-click context menu
 * @param {boolean} options.blockDevKeys - Block keyboard shortcuts for dev tools
 * @param {boolean} options.obscureOnDevTools - Obscure content when dev tools are detected
 * @param {boolean} options.showConsoleWarning - Show warning in console
 */
export default function useAntiSkid({
  disableSelection = true,
  disableContextMenu = true,
  blockDevKeys = true,
  obscureOnDevTools = true,
  showConsoleWarning = true
} = {}) {
  const [devToolsOpen, setDevToolsOpen] = useState(false);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Show warning message in console
    if (showConsoleWarning) {
      showDevToolsWarning();
    }
    
    // Initial detection
    const initialCheck = () => {
      const isOpen = detectDevTools();
      setDevToolsOpen(isOpen);
      if (isOpen && obscureOnDevTools) {
        applyDevToolsObscuring();
      }
    };
    
    // Event handlers
    const handleKeyDown = (e) => {
      if (blockDevKeys && blockDevToolsKeys(e)) {
        e.preventDefault();
        showDevToolsWarning();
        return false;
      }
      return true;
    };
    
    const handleContextMenu = (e) => {
      if (disableContextMenu) {
        disableRightClick(e);
      }
    };
    
    const handleDevToolsChange = (event) => {
      setDevToolsOpen(event.detail.isOpen);
      if (event.detail.isOpen && obscureOnDevTools) {
        applyDevToolsObscuring();
      } else {
        cleanupAntiSkid();
      }
    };
    
    // Regular interval check for dev tools
    const intervalCheck = setInterval(() => {
      const isOpen = detectDevTools();
      if (isOpen !== devToolsOpen) {
        setDevToolsOpen(isOpen);
        if (isOpen && obscureOnDevTools) {
          applyDevToolsObscuring();
        } else if (!isOpen) {
          cleanupAntiSkid();
        }
      }
    }, 1000);
    
    // Apply CSS for selection disabling if needed
    if (disableSelection) {
      document.body.classList.add('disable-selection');
    }
    
    // Set up event listeners
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('devtoolschange', handleDevToolsChange);
    
    // Initial check
    setTimeout(initialCheck, 1000);
    
    // Cleanup function
    return () => {
      clearInterval(intervalCheck);
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('devtoolschange', handleDevToolsChange);
      document.body.classList.remove('disable-selection');
      cleanupAntiSkid();
    };
  }, [
    disableSelection,
    disableContextMenu,
    blockDevKeys,
    obscureOnDevTools,
    showConsoleWarning,
    devToolsOpen
  ]);

  return { devToolsOpen };
}
