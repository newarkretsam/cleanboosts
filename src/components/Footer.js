'use client';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function Footer() {
  const paymentMethods = ['paypal', 'visa', 'mastercard', 'bitcoin', 'cashapp'];
  const allPaymentMethods = [...paymentMethods, ...paymentMethods, ...paymentMethods, ...paymentMethods];

  return (
    <footer id="contact" className="bg-[#210120] z-[70] w-full relative text-white pt-16 pb-8 border-t border-[#ff00ff]/20 overflow-hidden">
      <div 
        className="absolute left-1/2 bottom-[-100px] -translate-x-1/2 w-full max-w-9xl h-80 rounded-full blur-2xl opacity-50 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,0,255,0.4) 0%, rgba(255,0,255,0.1) 40%, rgba(33,1,32,0) 70%)',
        }}
      ></div>
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-y-10 gap-x-8 mb-12">
          <div className="md:col-span-3">
            {/* Logo and name */}
            <div className="flex items-center gap-3 mb-5">
              <div className="relative w-10 h-10 rounded-full overflow-hidden">
                <Image
                  src="/image/logo.webp"
                  alt="CleanBoosts Logo"
                  width={100}
                  height={100}
                  style={{
                    width: '100%',
                    height: 'auto',
                    filter: 'drop-shadow(0px 0px 8px rgba(255, 0, 255, 0.7))'
                  }}
                  quality={100}
                />
              </div>
              <h4 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] animate-gradient">
                CleanBoosts
              </h4>
            </div>
            
            {/* Description */}
            <p className="text-sm text-gray-300 leading-relaxed mb-6 pr-4 max-w-xl">
                 CleanBoosts provides premium Discord services including <span className="text-[#ff00ff]">Server Boosts, Nitro Tokens, and Discord Decorations</span>. We deliver fast, reliable, and affordable solutions to enhance your Discord server experience. Known for competitive pricing and exceptional service, CleanBoosts helps server owners grow their communities efficiently and effectively.
            </p>

            {/* Social media links */}
            <div className="flex gap-3">
              <a 
                href="https://discord.cleanboosts.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full flex items-center justify-center border bg-transparent border-[#ff00ff] transition-colors"
                aria-label="Discord"
              >
                <svg className="w-4 h-4 text-[#ff00ff]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.393-.403.85-.548 1.235a16.618 16.618 0 0 0-4.98 0 9.664 9.664 0 0 0-.554-1.235.077.077 0 0 0-.079-.036 19.146 19.146 0 0 0-4.885 1.49.07.07 0 0 0-.032.028C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 19.382 19.382 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.995a.076.076 0 0 0-.041-.106 12.786 12.786 0 0 1-1.87-.892.077.077 0 0 1-.008-.128 10.052 10.052 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.35 12.35 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.32 19.32 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.278c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a 
                href="https://t.me/cleanboosts" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-8 h-8 rounded-full flex items-center justify-center border bg-transparent border-[#ff00ff] transition-colors"
                aria-label="Telegram"
              >
                <svg className="w-4 h-4 text-[#ff00ff]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.16.16-.295.295-.603.295l.213-3.054 5.56-5.022c.242-.213-.054-.334-.373-.121l-6.871 4.326-2.962-.924c-.643-.204-.657-.643.136-.953l11.57-4.458c.532-.196 1.006.121.83.939z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-4">
            {/* Navigation Links */}
            <div>
              <h5 className="text-white font-medium text-sm mb-4">Navigation</h5>
              <ul className="space-y-2">
                <li><Link href="/#home" className="text-gray-400 hover:text-[#ff00ff] text-sm transition-colors">Home</Link></li>
                <li><Link href="/#about" className="text-gray-400 hover:text-[#ff00ff] text-sm transition-colors">About</Link></li>
                <li><Link href="/#products" className="text-gray-400 hover:text-[#ff00ff] text-sm transition-colors">Products</Link></li>
                <li><Link href="/#why-choose" className="text-gray-400 hover:text-[#ff00ff] text-sm transition-colors">Features</Link></li>
              </ul>
            </div>
            
            {/* Support Links */}
            <div>
              <h5 className="text-white font-medium text-sm mb-4">Support</h5>
              <ul className="space-y-2">
                <li><Link href="/terms" className="text-gray-400 hover:text-[#ff00ff] text-sm transition-colors">Terms of Service</Link></li>
                <li><Link href="/faq" className="text-gray-400 hover:text-[#ff00ff] text-sm transition-colors">Frequently Ask Questions</Link></li>
              </ul>
            </div>
            
            {/* Payment Methods*/}
            <div >
              <h5 className="text-white font-medium text-sm mb-1">Payment Methods</h5>
              <div className="infinite-carousel-container">
                <div className="infinite-carousel-payment">
                  {allPaymentMethods.map((method, i) => (
                    <div 
                      key={`${method}-${i}`}
                      className="infinite-carousel-item bg-transparent rounded-md p-2  flex items-center justify-center"
                      title={method.charAt(0).toUpperCase() + method.slice(1)}
                    >
                      <Image
                        src={`/image/payment/${method}.svg`}
                        alt={`${method} payment`}
                        width={20}
                        height={20}
                        className="opacity-60 hover:opacity-100 transition-opacity"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Divider */}
        <hr className="border-t border-gray-800 my-8" />
        
        {/* Bottom section with disclaimer and copyright */}
        <div className="text-xs text-gray-500">
          <p className="mb-6 max-w-3xl">
            Disclaimer: This website is in no way affiliated with, authorized, maintained, sponsored or endorsed by Discord Inc. (discord.com) or any of its affiliates or subsidiaries. Images belong to respected owners.
          </p>
          
          {/* Copyright */}
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <p className="mb-3 sm:mb-0">© {new Date().getFullYear()} CleanBoosts. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/terms" className="hover:text-[#ff00ff] transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
