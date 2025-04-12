// Anti-skid utility functions to prevent unauthorized copying and inspection

/**
 * Detects if DevTools are open
 * @returns {boolean}
 */
export const detectDevTools = () => {
  // Method 1: Element sizing difference detection
  const devToolsDetection = () => {
    const widthThreshold = 160; // Threshold for width difference
    const heightThreshold = 160; // Threshold for height difference
    
    const emitEvent = () => {
      window.dispatchEvent(new CustomEvent('devtoolschange', { detail: { isOpen: true } }));
    };
    
    // Check for size discrepancies that occur when dev tools are open
    const checkWindowSize = () => {
      // Account for browser zoom level
      const zoomLevel = window.devicePixelRatio || 1;
      
      // Adjust thresholds based on zoom level
      const adjustedWidthThreshold = widthThreshold * zoomLevel;
      const adjustedHeightThreshold = heightThreshold * zoomLevel;
      
      if (
        window.outerWidth - window.innerWidth > adjustedWidthThreshold ||
        window.outerHeight - window.innerHeight > adjustedHeightThreshold
      ) {
        emitEvent();
        return true;
      }
      return false;
    };

    return checkWindowSize();
  };

  // Method 2: Using console.log formatting (DevTools-specific behavior)
  const consoleDetection = () => {
    const isFirebug = () => {
      return window.console && (window.console.firebug || window.console.table && /firebug/i.test(window.console.table.toString()));
    };

    const isChromiumDevtools = () => {
      const testEl = document.createElement('div');
      testEl.setAttribute('id', 'devtoolsconsole');
      testEl.setAttribute('style', 'background-image: url("data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7")');
      testEl.innerHTML = '&nbsp;';
      document.body.appendChild(testEl);
      
      // Store the current styling
      const originalStyle = window.getComputedStyle(testEl).backgroundImage;
      
      // Try a DevTools-specific command that will trigger a different result
      console.log('%c', `
        background: url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7);
        background-repeat: no-repeat;
        background-size: cover;
        padding: 100px;
      `);
      
      // Look for changes that indicate DevTools are open
      const newStyle = window.getComputedStyle(testEl).backgroundImage;
      document.body.removeChild(testEl);
      
      return originalStyle !== newStyle;
    };

    return isFirebug() || isChromiumDevtools();
  };
  
  return devToolsDetection() || consoleDetection();
};

/**
 * Blocks common key combinations used to access dev tools
 * @param {KeyboardEvent} event - The keyboard event
 * @returns {boolean}
 */
export const blockDevToolsKeys = (event) => {
  const keyCode = event.which || event.keyCode;
  
  // Block F12
  if (keyCode === 123) {
    return true;
  }
  
  // Block Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
  if ((event.ctrlKey && event.shiftKey) && (keyCode === 73 || keyCode === 74 || keyCode === 67)) {
    return true;
  }
  
  // Block Ctrl+U (view source)
  if (event.ctrlKey && keyCode === 85) {
    return true;
  }
  
  return false;
};

/**
 * Disables right-click context menu
 * @param {MouseEvent} event - The mouse event
 */
export const disableRightClick = (event) => {
  event.preventDefault();
};

/**
 * Shows a warning to users when dev tools are likely open
 */
export const showDevToolsWarning = () => {
  console.clear();
  console.log('%c⚠️ Warning!', 'color: red; font-size: 30px; font-weight: bold;');
  console.log(
    '%cThis is a browser feature intended for developers. If someone told you to copy-paste something here to get access to premium features or "hack" someone\'s account, it is a scam and will give them access to your account.',
    'font-size: 18px;'
  );
  console.log(
    '%cCleanBoosts website is protected and any unauthorized access attempts are logged.',
    'color: orange; font-size: 18px; font-weight: bold;'
  );
};

/**
 * Obscures page content when DevTools are open
 */
export const applyDevToolsObscuring = () => {
  // Add blur to the entire page content
  document.body.style.filter = 'blur(10px)';
  document.body.style.opacity = '0.3';
  
  // Display warning overlay
  const overlay = document.createElement('div');
  overlay.id = 'dev-tools-warning-overlay';
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
  overlay.style.zIndex = '999999';
  overlay.style.display = 'flex';
  overlay.style.flexDirection = 'column';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.color = '#ff00ff';
  overlay.style.fontFamily = 'sans-serif';
  overlay.style.fontSize = '24px';
  overlay.style.textAlign = 'center';
  overlay.style.padding = '20px';
  
  overlay.innerHTML = `
    <h2 style="color: #ff00ff; margin-bottom: 20px;">Developer Tools Detected</h2>
    <p style="color: #fff; margin-bottom: 20px;">This website is protected against unauthorized access.</p>
    <p style="color: #fff; margin-bottom: 20px;">Please close Developer Tools to continue browsing.</p>
    <button id="restore-page-button" style="
      background: linear-gradient(to right, #ff00ff, #ff33ff);
      border: none;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 20px;">
      I Understand, Close DevTools
    </button>
  `;
  
  document.body.appendChild(overlay);
  
  // Add button to restore page when DevTools are closed
  document.getElementById('restore-page-button').addEventListener('click', () => {
    const isDevToolsStillOpen = detectDevTools();
    if (!isDevToolsStillOpen) {
      document.body.style.filter = '';
      document.body.style.opacity = '';
      document.body.removeChild(overlay);
    } else {
      alert('Please close Developer Tools first');
    }
  });
};

/**
 * Clean up any DOM elements created by the anti-skid system
 */
export const cleanupAntiSkid = () => {
  const overlay = document.getElementById('dev-tools-warning-overlay');
  if (overlay) {
    document.body.removeChild(overlay);
  }
  document.body.style.filter = '';
  document.body.style.opacity = '';
};
