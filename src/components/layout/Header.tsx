'use client';

/**
 * 网站头部导航
 * Apple 风格的简洁导航栏
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { NavItem } from '@/types/content';

interface HeaderProps {
  logo?: string;
  navigation: NavItem[];
}

export function Header({ logo = 'Orbweb', navigation }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <>
      <motion.header
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${isScrolled 
            ? 'bg-black/80 backdrop-blur-xl' 
            : 'bg-transparent'
          }
        `}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <nav className="max-w-[1200px] mx-auto px-6 h-12 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="text-white font-semibold text-[18px] hover:opacity-80 transition-opacity"
          >
            {logo}
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-white/80 text-[14px] hover:text-white transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg 
              width="18" 
              height="18" 
              viewBox="0 0 18 18" 
              fill="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M4.5 4.5l9 9m0-9l-9 9" stroke="currentColor" strokeWidth="1.5" fill="none" />
              ) : (
                <>
                  <rect y="4" width="18" height="1.5" rx="0.75" />
                  <rect y="8.5" width="18" height="1.5" rx="0.75" />
                  <rect y="13" width="18" height="1.5" rx="0.75" />
                </>
              )}
            </svg>
          </button>
        </nav>
      </motion.header>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black pt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav 
              className="flex flex-col items-center justify-center h-full gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
            >
              {navigation.map((item) => (
                <motion.div
                  key={item.href}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    href={item.href}
                    className="text-white text-[28px] font-medium hover:text-white/80 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

