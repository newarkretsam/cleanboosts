import './globals.css';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import AntiSkidProvider from '@/components/AntiSkidProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'CleanBoosts - Premium Discord Services',
  description: 'Get premium Discord services including server boosts, nitro, and more at competitive prices.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntiSkidProvider>
          {children}
        </AntiSkidProvider>
        <Script src="/js/protection.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
