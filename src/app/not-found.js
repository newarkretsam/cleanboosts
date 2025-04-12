'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import AOS from "aos";
import { AuroraBackground } from "@/components/ui/aurora-background";
import "aos/dist/aos.css";

export default function NotFound() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-out',
    });
  }, []);

  return (
    <AuroraBackground className="flex flex-col min-h-screen ">
      
      <div className="flex-grow flex flex-col items-center justify-center px-4 py-20 relative z-10">
        <div 
          className="absolute inset-0 z-0 opacity-20 "
          style={{
            backgroundImage: 'url(/image/crystal.png)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        ></div>
        
        <div className="glass-card-moving-border max-w-xl w-full p-1 relative z-12" data-aos="fade-up">
          <div className="bg-gradient-to-br from-black/70 via-black/80 to-black/70 backdrop-blur-lg rounded-xl p-8 md:p-12 text-center">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-fuchsia-600 animate-gradient">404</h1>
            
            <div className="relative w-24 h-24 mx-auto mb-6 ">
              <Image
                src="/image/logo.gif"
                alt="CleanBoosts Logo"
                fill
                style={{
                  objectFit: 'contain',
                }}
                className="animate-float rounded-full"
                priority
              />
            </div>
            
            <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-white">Page Not Found</h2>
            
            <p className="text-gray-300 mb-8">
              The boost you&apos;re looking for has vanished into the digital void. Let&apos;s get you back to safer territory.
            </p>
            
            <Link href="/" legacyBehavior>
              <a className="inline-block bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 text-white font-medium py-3 px-8 rounded-lg transform transition-all hover:scale-105 active:scale-95 shadow-lg shadow-pink-900/30">
                Return to Home
              </a>
            </Link>
          </div>
        </div>
        
       
      </div>
      
      <footer className="py-4 text-center bg-black/60 backdrop-blur-sm border-t border-pink-900/20">
        <p className="text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} CleanBoosts. All rights reserved.
        </p>
      </footer>
    </AuroraBackground>
  );
}
