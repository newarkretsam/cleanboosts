'use client';

import React from 'react';
import Image from 'next/image';
import styles from './PageLoader.module.css';

const PageLoader = () => {
  return (
    <div className={styles.pageLoaderContainer}>
      <div className={styles.loaderContent}>
        <div className={styles.imageContainer}>
          <Image
            src="/image/rotatingLogo.gif"
            alt="Loading..."
            className={styles.loaderImage}
            width={150}
            height={150}
          />
        </div>
        <h2 className={styles.loaderText}>
          <span>C</span>
          <span>l</span>
          <span>e</span>
          <span>a</span>
          <span>n</span>
          <span>B</span>
          <span>o</span>
          <span>o</span>
          <span>s</span>
          <span>t</span>
          <span>s</span>
        </h2>
      </div>
    </div>
  );
};

export default PageLoader;
