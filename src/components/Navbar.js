'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll);

    const hash = window.location.hash.substring(1);
    if (hash) {
      setTimeout(() => scrollToSection(hash, false), 100);
    }

    const sectionIds = ['home', 'about', 'products', 'advantages', 'reviews'];
    const sectionElements = sectionIds
      .map(id => document.getElementById(id))
      .filter(el => el !== null);

    // Improved observer options for better section detection
    const observerOptions = {
      root: null,
      // Adjusted margins to detect sections earlier
      rootMargin: '-20% 0px -20% 0px',
      // Lower threshold makes detection more sensitive
      threshold: 0.1,
    };

    const observerCallback = (entries) => {
      // Find the most visible section
      const visibleEntries = entries.filter(entry => entry.isIntersecting);
      
      if (visibleEntries.length > 0) {
        // If multiple sections are visible, use the one with highest visibility ratio
        const mostVisibleEntry = visibleEntries.reduce((prev, current) => {
          return (prev.intersectionRatio > current.intersectionRatio) ? prev : current;
        });
        
        setActiveSection(mostVisibleEntry.target.id);
        
        if (window.location.pathname === '/') {
          window.history.replaceState({}, '', `/#${mostVisibleEntry.target.id}`);
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sectionElements.forEach(element => {
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      sectionElements.forEach(element => {
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  const scrollToSection = (sectionId, updateUrl = true) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }, 100);

      if (updateUrl && window.location.pathname === '/') {
        window.history.pushState({}, '', `/#${sectionId}`);
      }
    }

    setActiveSection(sectionId);
  };

  const handleNavigation = (e, sectionId) => {
    e.preventDefault();

    if (window.location.pathname === '/') {
      scrollToSection(sectionId);
    } else {
      router.push(`/#${sectionId}`);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavigation = (e, sectionId) => {
    e.preventDefault();
    handleNavigation(e, sectionId);
    setIsMobileMenuOpen(false);
  };

  const toggleDropdown = (id, e) => {
    e?.preventDefault();
    setOpenDropdown(openDropdown === id ? null : id);
  };

  const handleDropdownItemClick = (e, path) => {
    e.preventDefault();
    router.push(path);
    setOpenDropdown(null);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'products', label: 'Products' },
    { id: 'advantages', label: 'Advantages' },
    { id: 'reviews', label: 'Reviews' },
    {
      id: 'resources',
      label: 'Resources',
      dropdown: [
        { id: 'faq', label: 'FAQ', path: '/faq' },
        { id: 'terms', label: 'Terms', path: '/terms' }
      ]
    }
  ];

  const renderNavIcon = (id) => {
    switch (id) {
      case 'home':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        );
      case 'about':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case 'products':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        );
      case 'advantages':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        );
      case 'reviews':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4.354 4.354 0 100 8.708 4.354 4.354 0 000-8.708zM12 2a6.354 6.354 0 110 12.708A6.354 6.354 0 0112 2zm0 14.708c-4.418 0-8 2.015-8 4.354v2h16v-2c0-2.339-3.582-4.354-8-4.354z" />
          </svg>
        );
      case 'resources':
        return (
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 w-full z-[100] transition-all duration-300 py-5"
      style={{
        backdropFilter: 'blur(10px)',
        boxShadow: scrolled ? '0 4px 20px rgba(255, 0, 255, 0.2)' : 'none',
        background: scrolled
          ? 'linear-gradient(to bottom, rgba(255,0,255,0.3) 0%, rgba(0,0,0,0.7) 100%)'
          : 'linear-gradient(to bottom, rgba(255,0,255,0.25) 0%, rgba(0,0,0,0.6) 100%)'
      }}
    >
      <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-[#ff00ff]/90 to-transparent"></div>

      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <div className="flex flex-row items-center cursor-pointer gap-2">
            <div className="relative w-8 h-8 rounded-full animate-pulse-glow">
              <Image
                className='rounded-full'
                src="/image/logo.webp"
                alt="Discord Logo"
                width={250}
                height={250}
                style={{
                  width: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0px 0px 8px rgba(255, 0, 255, 0.7))'
                }}
                quality={100}
                priority
              />
            </div>

            <div className="font-extrabold text-sm tracking-tight">
              <Link href="/" legacyBehavior>
                <a className="bg-gradient-to-r from-[#ff00ff] to-[#ff33ff] bg-clip-text text-transparent animate-gradient">
                  CLEAN<span className="font-extrabold">BOOSTS</span>
                </a>
              </Link>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <div key={item.id} className="relative">
                {item.dropdown ? (
                  <div ref={item.id === openDropdown ? dropdownRef : null}>
                    <button
                      className={`flex items-center gap-1.5 py-1.5 px-2 text-xs font-medium transition-all rounded-xl border ${
                        openDropdown === item.id
                          ? 'text-white bg-gradient-to-r from-[#ff00ff]/80 to-[#ff33ff]/80 border-[#ff00ff] shadow-[0_0_10px_rgba(255,0,255,0.5)]'
                          : 'border-[#ff00ff]/20 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#ff00ff]/20 hover:to-[#ff33ff]/20 hover:border-[#ff00ff]/50'
                      }`}
                      onClick={(e) => toggleDropdown(item.id, e)}
                    >
                      {renderNavIcon(item.id)}
                      <span>{item.label}</span>
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                    {openDropdown === item.id && (
                      <div className="absolute mt-1 w-40 rounded-lg shadow-lg bg-gradient-to-b from-[#330033] to-[#120012] border border-[#ff00ff]/30 overflow-hidden z-50 py-1">
                        {item.dropdown.map((dropdownItem) => (
                          <Link key={dropdownItem.id} href={dropdownItem.path} legacyBehavior>
                            <a
                              className="block px-4 py-2 text-xs text-gray-300 hover:bg-[#ff00ff]/20 hover:text-white transition-colors"
                              onClick={(e) => handleDropdownItemClick(e, dropdownItem.path)}
                            >
                              {dropdownItem.label}
                            </a>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link href={`/#${item.id}`} legacyBehavior>
                    <a
                      className={`flex items-center gap-1.5 py-1.5 px-2 text-xs font-medium transition-all rounded-xl border ${
                        activeSection === item.id
                          ? 'text-white bg-gradient-to-r from-[#ff00ff]/80 to-[#ff33ff]/80 border-[#ff00ff] shadow-[0_0_10px_rgba(255,0,255,0.5)]'
                          : 'border-[#ff00ff]/20 text-gray-300 hover:text-white hover:bg-gradient-to-r hover:from-[#ff00ff]/20 hover:to-[#ff33ff]/20 hover:border-[#ff00ff]/50'
                      }`}
                      onClick={(e) => handleNavigation(e, item.id)}
                    >
                      {renderNavIcon(item.id)}
                      <span>{item.label}</span>
                    </a>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='hidden md:flex items-center gap-2'>
          <a
            href="https://discord.cleanboosts.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#5865F2] via-[#6d7ce0] to-[#7289DA] text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-lg shadow-[#5865F2]/30 hover:shadow-[#5865F2]/50 hover:scale-105 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.393-.403.85-.548 1.235a16.618 16.618 0 0 0-4.98 0 9.664 9.664 0 0 0-.554-1.235.077.077 0 0 0-.079-.036 19.146 19.146 0 0 0-4.885 1.49.07.07 0 0 0-.032.028C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 19.382 19.382 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.995a.076.076 0 0 0-.041-.106 12.786 12.786 0 0 1-1.87-.892.077.077 0 0 1-.008-.128 10.052 10.052 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.35 12.35 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.32 19.32 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.278c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
            Discord
          </a>

          <a
            href="https://t.me/cleanboosts"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#0088cc] via-[#00a2ea] to-[#0088cc] text-white text-xs font-medium py-1.5 px-3 rounded-lg shadow-lg shadow-[#0088cc]/30 hover:shadow-[#0088cc]/50 hover:scale-105 transition-all duration-300"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
            </svg>
            Telegram
          </a>
        </div>

        <button
          onClick={toggleMobileMenu}
          className="md:hidden p-2 text-white hover:bg-[#ff00ff]/20 rounded-lg transition-colors"
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleMobileMenu}></div>
            <div
              className="fixed right-0 top-0 bottom-0 w-64 shadow-lg transform transition-transform duration-300 ease-in-out"
            >
              <div className="p-5"
                style={{
                  background: 'linear-gradient(135deg, #330033 0%, #210021 50%, #120012 100%)',
                  boxShadow: '0 0 20px rgba(255, 0, 255, 0.4), inset 0 0 15px rgba(255, 0, 255, 0.1)',
                  borderLeft: '1px solid rgba(255, 0, 255, 0.3)'
                }}
              >
                <button
                  onClick={toggleMobileMenu}
                  className="absolute top-4 right-4 p-2 text-white hover:bg-[#ff00ff]/20 rounded-lg transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <div className="mt-8 flex flex-col gap-2">
                  {navItems.map((item) => (
                    <div key={item.id}>
                      {item.dropdown ? (
                        <>
                          <button
                            className={`flex items-center justify-between w-full gap-1.5 py-2 px-4 text-sm font-medium transition-all rounded-xl ${
                              openDropdown === item.id
                                ? 'text-white bg-gradient-to-r from-[#ff00ff]/80 to-[#ff33ff]/80 shadow-[0_0_10px_rgba(255,0,255,0.5)]'
                                : 'text-gray-300 hover:text-white hover:bg-[#ff00ff]/20'
                            }`}
                            onClick={(e) => toggleDropdown(item.id, e)}
                          >
                            <div className="flex items-center gap-1.5">
                              {renderNavIcon(item.id)}
                              <span>{item.label}</span>
                            </div>
                            <svg
                              className={`w-4 h-4 transition-transform ${openDropdown === item.id ? 'rotate-180' : ''}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>

                          {openDropdown === item.id && (
                            <div className="ml-4 mt-1 mb-2 border-l-2 border-[#ff00ff]/30 pl-4">
                              {item.dropdown.map((dropdownItem) => (
                                <Link key={dropdownItem.id} href={dropdownItem.path} legacyBehavior>
                                  <a
                                    className="block py-2 text-sm text-gray-300 hover:text-white hover:bg-[#ff00ff]/10 rounded-lg px-2 transition-colors"
                                    onClick={(e) => handleDropdownItemClick(e, dropdownItem.path)}
                                  >
                                    {dropdownItem.label}
                                  </a>
                                </Link>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <Link href={`/#${item.id}`} legacyBehavior>
                          <a
                            className={`flex items-center gap-1.5 py-2 px-4 text-sm font-medium transition-all rounded-xl ${
                              activeSection === item.id
                                ? 'text-white bg-gradient-to-r from-[#ff00ff]/80 to-[#ff33ff]/80 shadow-[0_0_10px_rgba(255,0,255,0.5)]'
                                : 'text-gray-300 hover:text-white hover:bg-[#ff00ff]/20'
                            }`}
                            onClick={(e) => handleMobileNavigation(e, item.id)}
                          >
                            {renderNavIcon(item.id)}
                            <span>{item.label}</span>
                          </a>
                        </Link>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href="https://discord.cleanboosts.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-[#5865F2] text-white text-sm font-medium py-2 px-4 rounded-lg"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.393-.403.85-.548 1.235a16.618 16.618 0 0 0-4.98 0 9.664 9.664 0 0 0-.554-1.235.077.077 0 0 0-.079-.036 19.146 19.146 0 0 0-4.885 1.49.07.07 0 0 0-.032.028C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 19.382 19.382 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.995a.076.076 0 0 0-.041-.106 12.786 12.786 0 0 1-1.87-.892.077.077 0 0 1-.008-.128 10.052 10.052 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.35 12.35 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.32 19.32 0 0 0 6.002-3.03.078.078 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.278c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                    Discord
                  </a>

                  <a
                    href="https://t.me/cleanboosts"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-[#0088cc] text-white text-sm font-medium py-2 px-4 rounded-lg"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.96 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.244-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                    </svg>
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#ff00ff]/60 to-transparent"></div>
    </nav>
  );
}