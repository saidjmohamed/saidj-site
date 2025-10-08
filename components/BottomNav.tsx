import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BottomNavHomeIcon, BottomNavServicesIcon, BottomNavArticlesIcon, BottomNavContactIcon } from './icons';

const BottomNav: React.FC = () => {
  const { t } = useLanguage();

  const navItems = [
    { href: '#hero', icon: <BottomNavHomeIcon className="w-6 h-6 mb-1" />, textKey: 'bottom_nav_home' },
    { href: '#practice-areas', icon: <BottomNavServicesIcon className="w-6 h-6 mb-1" />, textKey: 'bottom_nav_practice_areas' },
    { href: '#articles', icon: <BottomNavArticlesIcon className="w-6 h-6 mb-1" />, textKey: 'bottom_nav_articles' },
    { href: '#contact', icon: <BottomNavContactIcon className="w-6 h-6 mb-1" />, textKey: 'bottom_nav_contact' },
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
    <nav className="md:hidden fixed bottom-0 right-0 left-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-40 border-t border-slate-200">
      <div className="flex justify-around items-center h-16">
        {navItems.map(item => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className="flex flex-col items-center justify-center text-slate-600 hover:text-teal-600 transition-colors w-full h-full"
            aria-label={t(item.textKey)}
          >
            {item.icon}
            <span className="text-xs font-medium">{t(item.textKey)}</span>
          </a>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;