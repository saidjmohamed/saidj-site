import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { translations } from '../translations';
import LanguageSwitcher from './LanguageSwitcher';

interface NavItem {
  key: string;
  href: string;
  label: string;
}

const ModernHeader: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { key: 'home', href: '#home', label: t.nav.home },
    { key: 'about', href: '#about', label: t.nav.about },
    { key: 'services', href: '#services', label: t.nav.services },
    { key: 'articles', href: '#articles', label: t.nav.articles },
    { key: 'testimonials', href: '#testimonials', label: t.nav.testimonials },
    { key: 'contact', href: '#contact', label: t.nav.contact }
  ];

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      setIsScrolled(scrollTop > 50);

      // Update active section
      const sections = navItems.map(item => item.key);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Mouse tracking for glow effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        ref={headerRef}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out
          ${isScrolled
            ? 'backdrop-blur-xl bg-white/10 border-b border-white/20 shadow-2xl'
            : 'bg-transparent'
          }
        `}
      >
        {/* Gradient Border */}
        <div className={`
          absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent
          transition-opacity duration-500
          ${isScrolled ? 'opacity-100' : 'opacity-0'}
        `} />

        {/* Background Glow Effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(102, 126, 234, 0.1), transparent 40%)`
          }}
        />

        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-[#d4af37] to-[#aa8a2a] rounded-xl flex items-center justify-center text-[#0a1628] font-bold text-xl group-hover:scale-110 transition-all duration-300 shadow-lg group-hover:shadow-2xl border border-[#f4d984]/30">
                  <span className="relative z-10">⚖️</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#f4d984] rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-[#d4af37] group-hover:to-[#f4d984] transition-all duration-300">
                  {t.header.title}
                </h1>
                <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300">
                  {t.header.subtitle}
                </p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.key}
                  onClick={() => scrollToSection(item.href)}
                  className={`
                    relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${activeSection === item.key
                      ? 'text-white bg-white/20 backdrop-blur-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                    }
                    group overflow-hidden
                  `}
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/20 to-[#aa8a2a]/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur" />

                  {/* Active indicator */}
                  {activeSection === item.key && (
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gradient-to-r from-[#d4af37] to-[#f4d984] rounded-full animate-pulse" />
                  )}

                  <span className="relative z-10">{item.label}</span>

                  {/* Shine effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
                </button>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language Switcher */}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>

              {/* CTA Button */}
              <button
                onClick={() => scrollToSection('#contact')}
                className="hidden sm:block btn-modern btn-primary px-6 py-2 text-sm font-semibold relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {t.header.contactButton}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
              >
                <div className="w-6 h-6 flex flex-col items-center justify-center space-y-1 group-hover:scale-110 transition-transform duration-300">
                  <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                  <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className={`
          fixed top-20 left-4 right-4 z-40 lg:hidden transition-all duration-500 ease-out transform origin-top
          ${isMobileMenuOpen
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'
          }
        `}
      >
        <div className="glass-strong rounded-2xl p-6 border border-white/20 shadow-2xl">
          {/* Mobile Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item, index) => (
              <button
                key={item.key}
                onClick={() => scrollToSection(item.href)}
                className={`
                  w-full text-left px-4 py-3 rounded-xl text-white font-medium transition-all duration-300
                  ${activeSection === item.key
                    ? 'bg-gradient-to-r from-[#d4af37]/20 to-[#aa8a2a]/20 text-white'
                    : 'hover:bg-white/10 text-white/80 hover:text-white'
                  }
                  group relative overflow-hidden
                `}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37]/10 to-[#aa8a2a]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <span className="relative z-10 flex items-center justify-between">
                  {item.label}
                  {activeSection === item.key && (
                    <div className="w-2 h-2 bg-gradient-to-r from-[#d4af37] to-[#f4d984] rounded-full animate-pulse" />
                  )}
                </span>
              </button>
            ))}
          </nav>

          {/* Mobile Language Switcher */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <LanguageSwitcher />
          </div>

          {/* Mobile CTA */}
          <div className="mt-6">
            <button
              onClick={() => scrollToSection('#contact')}
              className="w-full btn-modern btn-primary py-3 text-center font-semibold relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {t.header.contactButton}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 lg:hidden animate-fade-in"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default ModernHeader;