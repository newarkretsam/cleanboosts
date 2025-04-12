'use client'

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AuroraBackground } from "@/components/ui/aurora-background";
import DiamondBackground from "@/components/DiamondBackground";
import PageLoader from "@/components/PageLoader";
import {faqData} from "@/data/faq";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Faq() {
  const [pageLoading, setPageLoading] = useState(true);
  const [isMediumScreen, setIsMediumScreen] = useState(false);

useEffect(() => {
  setIsMediumScreen(window.innerWidth >= 768);
  
  const handleResize = () => {
    setIsMediumScreen(window.innerWidth >= 768);
  };
  
  window.addEventListener('resize', handleResize);
  
  return () => window.removeEventListener('resize', handleResize);
}, []);
  const stepsRefs = useRef([]);
  
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      easing: 'ease-out',
    });

    const minLoadingTime = setTimeout(() => {
      setPageLoading(false);
    }, 2500);

    return () => clearTimeout(minLoadingTime);
  }, []);

  const standardFaqItems = faqData.filter(item => !item.type);
  const howItWorksSection = faqData.find(item => item.type === "howItWorks");

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
              
              
              {/* FAQ Container */}
              <div className="container w-full sm:w-[85%] md:w-[75%] lg:w-2/3 xl:w-1/2 mx-auto relative z-10 mb-16">
                <div className="pink-animated-border rounded-xl overflow-hidden hover-trigger shadow-2xl shadow-[#ff00ff]/20" data-aos="fade-up">
                  <div className="p-0.5 mb-0">
                    <div className="shine-effect absolute top-0 left-0 w-full h-full z-10"></div>
                    
                    <div className="absolute top-0 left-0 w-full px-22 h-[full] opacity-10 pointer-events-none">
                      <div className="absolute top-5 right-5 w-40 h-40 rounded-full bg-[#ff00ff]/30 blur-3xl"></div>
                      <div className="absolute bottom-5 left-5 w-40 h-40 rounded-full bg-[#ff33ff]/20 blur-3xl"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-[#ff00ff]/15 blur-3xl"></div>
                    </div>
                    
                    <div className="bg-[#210021] backdrop-blur-lg rounded-xl p-6 sm:p-10 md:p-16 relative z-10">
                      <div 
                        className="absolute left-1/2 bottom-[-120px] -translate-x-1/2 w-full max-w-9xl h-1/2 rounded-full blur-2xl opacity-50 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle, rgba(255,0,255,0.4) 0%, rgba(255,0,255,0.1) 40%, rgba(33,1,32,0) 80%)',
                        }}
                      ></div>
                      <div className="flex flex-col sm:flex-row items-center sm:justify-between mb-2 sm:mb-4 gap-4">
                        <div className="relative">
                          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fc82fc] to-[#fc82fc] via-[#ff00ff] animate-gradient text-center sm:text-left"
                              style={{
                                textShadow: '0 2px 8px rgba(255, 0, 255, 0.6)'
                              }}>
                            Frequently Asked Questions
                          </h1>
                          <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent rounded-full animate-pulse"></div>
                        </div>
                        
                        <div className="relative w-12 h-12 group">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] opacity-70 blur-md animate-pulse-slow"></div>
                          <Image
                            src="/image/logo.webp"
                            alt="CleanBoost Logo"
                            width={48}
                            height={48}
                            style={{
                              objectFit: 'contain',
                              filter: 'drop-shadow(0px 0px 8px rgba(255, 0, 255, 0.7))',
                              animation: isMediumScreen ? 'float 4s ease-in-out infinite' : 'none'
                            }}
                            className="rounded-full relative z-10 group-hover:scale-110 transition-all duration-300"
                            priority
                          />
                        </div>
                      </div>
                      
                      <p className="text-gray-300 mb-8 text-sm sm:text-base border-l-4 border-[#ff00ff]/50 pl-4 italic"
                         style={{
                           textShadow: '0 1px 2px rgba(0, 0, 0, 0.8)'
                         }}>
                        Get quick answers to your most common questions about our Discord boosting services.
                      </p>
                      
                      <div className="space-y-8 sm:space-y-12 text-gray-200 text-sm sm:text-base">
                        {standardFaqItems.map((faq, index) => (
                          <section 
                            key={index} 
                            className="bg-[#210021]/80 backdrop-blur-md rounded-xl transition-all duration-500 shadow-lg shadow-[#ff00ff]/30"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                            data-aos-offset="200"
                          >
                            <div className="p-4 sm:p-5">
                              <div className="flex items-center gap-3 mb-4">
                                <h2 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] animate-gradient transition-transform duration-300"
                                    style={{
                                      textShadow: '0 2px 4px rgba(255, 0, 255, 0.5)'
                                    }}>
                                  {faq.question}
                                </h2>
                              </div>
                              
                              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#ff00ff]/30 to-transparent mb-4"></div>
                              
                              <p className="px-5 py-2 text-gray-300"
                                 style={{
                                   textShadow: '0 1px 2px rgba(0, 0, 0, 0.6)'
                                 }}>
                                {faq.answer}
                              </p>
                            </div>
                          </section>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* How It Works Section (floating outside the FAQ container) */}
              {howItWorksSection && (
                <div className="container mx-auto max-w-7xl px-4 sm:px-6 relative z-10 mb-20" data-aos="fade-up">
                  <div className="bg-tranparent backdrop-blur-md rounded-xl p-6 sm:p-8 md:p-12  overflow-hidden relative">
                    
                    
                    {/* How it Works Section Title */}
                    <div className="relative mb-10 text-center z-10">
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#fc82fc] to-[#fc82fc] via-[#ff00ff] animate-gradient"
                          style={{
                            textShadow: '0 2px 8px rgba(255, 0, 255, 0.6)'
                          }}>
                        {howItWorksSection.title}
                      </h2>
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#ff00ff] to-transparent rounded-full animate-pulse"></div>
                    </div>
                    
                    {/* Timeline Component */}
                    <div className="relative mx-auto max-w-5xl z-20">
                      {/* Timeline Line */}
                      <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#ff00ff] via-[#ff33ff] to-[#ff00ff]/10 hidden lg:block z-10" style={{height: '100%'}}></div>
                      
                      {howItWorksSection.steps.map((step, index) => {
                        const isEven = index % 2 === 0;
                        
                        return (
                          <div 
                            key={index}
                            ref={el => stepsRefs.current[index] = el}
                            className={`relative mb-16 ${isEven ? 'lg:ml-0 lg:pr-8' : 'lg:ml-auto lg:pl-8'} lg:w-[85%] z-20`}
                            data-aos={isEven ? "fade-right" : "fade-left"}
                          >
                            {/* Step marker on timeline */}
                            <div className="absolute top-10 right-0 lg:right-auto lg:left-1/2 transform lg:-translate-x-1/2 w-4 h-4 bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] rounded-full hidden lg:block z-10">
                              <div className="absolute inset-0 rounded-full bg-white opacity-60 animate-ping-slow"></div>
                            </div>
                            
                            <div className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-6 lg:gap-12 relative z-30`}>
                              {/* Step number circle */}
                              <div className="flex-shrink-0 relative z-20">
                                <div className="relative">
                                  <div className="absolute inset-0 -m-6 rounded-full bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] blur-xl opacity-70 z-0 animate-pulse-slow"></div>
                                  <div className="relative flex items-center justify-center w-20 h-20 border border-[#ff00ff]/50 rounded-full bg-[#210021]/80 backdrop-blur-sm shadow-lg z-20">
                                    <span className="font-bold text-2xl bg-gradient-to-r from-white to-[#ff33ff]/90 bg-clip-text text-transparent">
                                      {step.number.toString().padStart(2, '0')}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex-grow w-full lg:w-auto relative z-30">
                                <div className="relative h-full p-6 transition-all duration-500 bg-gradient-to-b from-[#210021]/90 to-[#210021]/80 rounded-xl border border-[#ff00ff]/30 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-[#ff00ff]/20 group">
                                  <div className=" absolute inset-0 bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] rounded-xl blur-md transition-opacity duration-300 opacity-5 group-hover:opacity-10"></div>
                                  
                                  <div className="relative z-10">
                                    <h3 className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] animate-gradient transition-transform duration-300"
                                    style={{
                                      textShadow: '0 2px 4px rgba(255, 0, 255, 0.5)'
                                    }}>
                                      {step.title}
                                    </h3>
                                    <p className="text-gray-300">
                                      {step.description}
                                    </p>
                                  </div>
                                  
                                  <div className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center rounded-full bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] text-white shadow-lg z-30">
                                    <svg viewBox="0 0 512 512" className="w-4 h-4" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" fill="currentColor"/>
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Down arrow between steps (except last step) */}
                            {index < howItWorksSection.steps.length - 1 && (
                              <div className="hidden lg:block absolute left-1/2 transform -translate-x-1/2 translate-y-12 z-20">
                                <div className="animate-bounce-slow">
                                  <svg width="20" height="30" viewBox="0 0 20 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M10 0V28M10 28L1 19M10 28L19 19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                      
                      {/* Container for Return Home button and the arrow underneath */}
                      <div className="relative mt-8 text-center">
                        {/* Return Home Button */}
                        <div className="flex justify-center relative z-30" data-aos="fade-up">
                          <Link href="/" className="relative group overflow-hidden rounded-lg bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] px-4 sm:px-6 py-2.5 sm:py-3.5 text-sm font-semibold text-white transition-all duration-500 ease-in-out hover:shadow-[0_0_25px_rgba(255,0,255,0.6)] transform hover:translate-y-[-2px] flex items-center gap-2">
                            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-white/0 via-white/30 to-white/0 -translate-x-full animate-[shimmer_2s_infinite] opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out"></span>
                            <span className="relative z-10" style={{ textShadow: '0 1px 3px rgba(0, 0, 0, 0.5)' }}>Return to Home</span>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                          </Link>
                        </div>
                        
                        
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
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
          
          {/* Add keyframes animation for float and bounce animations */}
          <style jsx global>{`
            @keyframes float-slow {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-15px); }
            }
            @keyframes float-medium {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(-10px); }
            }
            @keyframes pulse-slow {
              0%, 100% { opacity: 0.7; }
              50% { opacity: 0.4; }
            }
            @keyframes ping-slow {
              0% { transform: scale(1); opacity: 1; }
              75%, 100% { transform: scale(1.5); opacity: 0; }
            }
            @keyframes bounce-slow {
              0%, 100% { transform: translateY(0); }
              50% { transform: translateY(10px); }
            }
            .animate-float-slow {
              animation: float-slow 8s ease-in-out infinite;
            }
            .animate-float-medium {
              animation: float-medium 6s ease-in-out infinite;
            }
            .animate-pulse-slow {
              animation: pulse-slow 3s ease-in-out infinite;
            }
            .animate-ping-slow {
              animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
            }
            .animate-bounce-slow {
              animation: bounce-slow 2s ease-in-out infinite;
            }
          `}</style>
        </AuroraBackground>
      )}
    </>
  );
}
