'use client';

import React from 'react';
import useAntiSkid from '@/hooks/useAntiSkid';

/**
 * Provider component that adds anti-skid protection to the application
 */
const AntiSkidProvider = ({ children }) => {
  // Use the anti-skid hook with default settings
  useAntiSkid({
    disableSelection: true,
    disableContextMenu: true,
    blockDevKeys: true,
    obscureOnDevTools: true,
    showConsoleWarning: true
  });

  return <>{children}</>;
};

export default AntiSkidProvider;
