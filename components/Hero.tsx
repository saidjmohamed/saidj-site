import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';

const Hero: React.FC = () => {
  const { t, language } = useLanguage();

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
    <section 
      id="hero"
      className="relative bg-cover bg-center text-white py-40 px-6"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      <div className="relative container mx-auto text-center z-10">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-4 leading-tight">
          {t('hero_title')}
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light text-gray-200">
          {t('hero_subtitle')}
        </p>
        <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-gray-300">
          {t('hero_description')}
        </p>
        <a 
          href="#contact" 
          onClick={(e) => handleNavClick(e, '#contact')}
          className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-4 px-10 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-teal-500/30 inline-flex items-center justify-center gap-3"
        >
          <span>{t('hero_cta')}</span>
          {language === 'ar' ? <ArrowLeftIcon className="w-6 h-6" /> : <ArrowRightIcon className="w-6 h-6" />}
        </a>
      </div>
    </section>
  );
};

export default Hero;