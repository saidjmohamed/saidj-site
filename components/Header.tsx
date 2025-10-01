import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { GavelIcon } from './icons';

const Header: React.FC = () => {
  const { t } = useLanguage();

  const navLinks = [
    { href: '#hero', textKey: 'nav_home' },
    { href: '#about', textKey: 'nav_about' },
    { href: '#practice-areas', textKey: 'nav_practice_areas' },
    { href: '#testimonials', textKey: 'nav_testimonials' },
    { href: '#articles', textKey: 'nav_articles' },
    { href: '#faq', textKey: 'nav_faq' },
    { href: '#contact', textKey: 'nav_contact' },
  ];
  
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
      }
  };

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between flex-wrap">
          <a href="#hero" onClick={(e) => handleNavClick(e, '#hero')} className="flex items-center gap-3 text-xl sm:text-2xl font-bold">
            <div className="w-8 h-8 text-teal-400">
                <GavelIcon />
            </div>
            <span>{t('lawyer_name')}</span>
          </a>
          
          <div className="flex items-center">
            <nav className="hidden md:flex items-center gap-3 sm:gap-4 lg:gap-6">
              {navLinks.map(link => (
                <a 
                  key={link.href} 
                  href={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-sm sm:text-base text-gray-300 hover:text-teal-400 transition duration-300 whitespace-nowrap"
                >
                  {t(link.textKey)}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;