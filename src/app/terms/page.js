'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import DiamondBackground from "@/components/DiamondBackground";
import PageLoader from "@/components/PageLoader";
import apiCaller from "@/lib/apiCaller"; // Import the API caller utility directly
import AOS from "aos";
import "aos/dist/aos.css";

export default function Terms() {
  const [pageLoading, setPageLoading] = useState(true);
  const [tosData, setTosData] = useState('');
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-out',
    });

    // Fetch TOS data using the apiCaller directly
    const fetchTOS = async () => {
      try {
        const { success, data, error } = await apiCaller('/api/tos');
        
        if (success && data.tos) {
          setTosData(data.tos);
        } else {
          throw new Error(error || 'No TOS data available');
        }
      } catch (error) {
        console.error('Failed to fetch TOS:', error);
        setFetchError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTOS();

    const minLoadingTime = setTimeout(() => {
      setPageLoading(false);
    }, 2500);

    return () => clearTimeout(minLoadingTime);
  }, []);

  // Parse TOS data into sections
  const parseTOSSections = (tosText) => {
    if (!tosText) return [];
    
    // Split the TOS into sections based on numbered headings
    const sectionRegex = /(\d+)\.\s+([^\n]+)([^]*?)(?=\d+\.\s+|$)/g;
    const sections = [];
    let match;
    
    while ((match = sectionRegex.exec(tosText)) !== null) {
      const sectionNumber = match[1];
      const sectionTitle = match[2];
      // Get the content and split by newlines with '>' prefix
      let content = match[3].trim();
      const contentItems = content.split('\n>').map(item => item.trim()).filter(Boolean);
      
      sections.push({
        number: sectionNumber,
        title: sectionTitle,
        contentItems: contentItems
      });
    }
    
    return sections;
  };

  const tosSection = parseTOSSections(tosData);

  // Render content
  const renderTOSSections = () => {
    if (isLoading) {
      return <div className="text-center py-10">Loading Terms of Service...</div>;
    }

    if (fetchError) {
      return (
        <div className="text-center py-10 text-red-400">
          <p>Error loading Terms of Service: {fetchError}</p>
          <p className="mt-4">Please try again later or contact support.</p>
        </div>
      );
    }

    return tosSection.map((section, index) => (
      <section key={index} data-aos="fade-up" data-aos-delay={100 + (index * 50)}>
        <div className="flex flex-col items-start mb-6">
          <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] mb-2">
            {section.number}. {section.title}
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent rounded-full"></div>
          </h2>
        </div>
        {section.contentItems.map((item, itemIndex) => (
          <p key={itemIndex} className="mb-4">
            <span className="text-[#ff00ff]">→</span> {item.replace('>', '').trim()}
          </p>
        ))}
      </section>
    ));
  };

  return (
    <>
      {pageLoading ? (
        <PageLoader />
      ) : (
        <AuroraBackground className="min-h-screen">
          <div className="flex flex-col min-h-screen">
            <Navbar />
            
            <div className="flex-grow py-12 mt-16 md:py-20 px-4 md:px-6 relative">
              <DiamondBackground 
                rotation={0} 
                translateY="-5%" 
                left="-45%" 
                opacity={0.7}
                scale={0.3}
                height="60%" 
              />
              
              <div className="container w-full sm:w-[90%] md:w-[85%] lg:w-3/4 xl:w-2/3 mx-auto relative z-10">
                <div className="pink-animated-border rounded-xl overflow-hidden hover-trigger" data-aos="fade-up">
                  <div className="p-0.5 mb-0">
                    <div className="shine-effect absolute top-0 left-0 w-full h-full z-10"></div>
                    
                    <div className="absolute top-0 left-0 w-full px-22 h-full opacity-10 pointer-events-none">
                      <div className="absolute top-5 right-5 w-40 h-40 rounded-full bg-[#ff00ff]/30 blur-3xl"></div>
                      <div className="absolute bottom-5 left-5 w-40 h-40 rounded-full bg-[#ff33ff]/20 blur-3xl"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#ff00ff]/15 blur-3xl"></div>
                    </div>
                    
                    <div className="bg-[#210021] backdrop-blur-lg rounded-xl p-4 sm:p-5 md:p-8 relative z-10">
                      <div 
                        className="absolute left-1/2 bottom-[-120px] -translate-x-1/2 w-full max-w-9xl h-1/2 rounded-full blur-2xl opacity-50 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle, rgba(255,0,255,0.4) 0%, rgba(255,0,255,0.1) 40%, rgba(33,1,32,0) 80%)',
                        }}
                      ></div>
                      <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-6 sm:mb-8 gap-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fc82fc] to-[#fc82fc] via-[#ff00ff] animate-gradient text-center sm:text-left">
                          Terms and Conditions
                        </h1>
                        
                        <div className="relative w-12 h-12">
                          <Image
                            src="/image/logo.webp"
                            alt="CleanBoost Logo"
                            width={48}
                            height={48}
                            style={{
                              objectFit: 'contain',
                              filter: 'drop-shadow(0px 0px 8px rgba(255, 0, 255, 0.7))'
                            }}
                            className="animate-float rounded-full"
                            priority
                          />
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-6 text-sm sm:text-base">
                        Last updated: {new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}
                      </p>
                      
                      <div className="space-y-6 sm:space-y-8 text-gray-200 text-sm sm:text-base">
                        {renderTOSSections()}
                      </div>
                      
                      <div className="mt-8 sm:mt-12 text-center" data-aos="fade-up">
                        <Link href="/" className="relative overflow-hidden rounded-lg bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] px-4 sm:px-6 py-2.5 sm:py-3.5 text-sm font-semibold text-white transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] transform hover:translate-y-[-2px]">
                          <span className="absolute cursor-pointer inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"></span>
                          Return to Home
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <DiamondBackground 
                rotation={0} 
                translateY="230%" 
                left="90%" 
                position="left center" 
                opacity={0.3}
                scale={1.2}
                height="30%"
              />
            </div>
            
            <Footer />
          </div>
        </AuroraBackground>
      )}
    </>
  );
}
