import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ArrowLeftIcon, ArrowRightIcon } from './icons';

const HeroImproved: React.FC = () => {
  const { t, language } = useLanguage();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // تحسين إدارة الصور مع lazy loading
  const heroImageSources = useMemo(() => ({
    webp: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1&fm=webp',
    mobile: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=768&h=1024&dpr=1',
    desktop: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&dpr=1',
    fallback: 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }), []);

  // تأثير الظهور التدريجي
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // تحسين معالجة النقر على الروابط
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      // تحسين smooth scrolling مع تعديل للهيدر الثابت
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // إضافة focus للـ accessibility
      const focusableElement = element.querySelector('h1, h2, [tabindex]:not([tabindex="-1"])');
      if (focusableElement) {
        (focusableElement as HTMLElement).focus({ preventScroll: true });
      }
    }
  };

  // JSON-LD Schema للـ SEO
  const lawFirmSchema = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "مكتب الأستاذ سايج محمد للمحاماة",
    "alternateName": "Maître Saidj Mohamed Law Office",
    "description": "مكتب محاماة متخصص في القانون المدني والجزائي والتجاري والعائلي في الجزائر",
    "url": window.location.origin,
    "telephone": ["+213558357689", "+213662806025"],
    "email": "saidj.mohamed@gmail.com",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "12 شارع الاخوة الثلاثة بوعدو",
      "addressLocality": "بئر مراد رايس",
      "addressRegion": "الجزائر",
      "addressCountry": "DZ"
    },
    "areaServed": "الجزائر",
    "serviceType": ["القانون المدني", "القانون الجزائي", "قانون الأسرة", "القانون التجاري"],
    "priceRange": "استشارة مدفوعة",
    "openingHours": "Mo-Fr 09:00-17:00"
  }), []);

  return (
    <>
      {/* Schema Markup للـ SEO */}
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(lawFirmSchema)
        }}
      />

      <section 
        id="hero"
        className={`relative overflow-hidden text-white transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
        role="banner"
        aria-label={t('hero_title')}
        style={{
          minHeight: '100vh',
          background: !imageLoaded ? 'linear-gradient(135deg, #0f172a 0%, #334155 100%)' : 'transparent'
        }}
      >
        {/* خلفية محسنة مع responsive images */}
        <picture className="absolute inset-0 w-full h-full">
          <source 
            media="(max-width: 768px)" 
            srcSet={heroImageSources.mobile}
            type="image/jpeg"
          />
          <source 
            media="(min-width: 769px)" 
            srcSet={heroImageSources.desktop}
            type="image/jpeg"
          />
          <img
            src={heroImageSources.fallback}
            alt="مكتب الأستاذ سايج محمد للمحاماة - خدمات قانونية محترفة"
            className="w-full h-full object-cover"
            loading="eager"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            style={{
              filter: imageLoaded ? 'brightness(0.7)' : 'brightness(0.3)',
              transition: 'filter 0.8s ease-in-out'
            }}
          />
        </picture>

        {/* طبقة التدرج المحسنة */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
        
        {/* نمط شبكي خفيف للخلفية */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        {/* المحتوى الرئيسي */}
        <div className="relative container mx-auto px-6 py-20 min-h-screen flex flex-col justify-center items-center text-center z-10">
          {/* شعار/أيقونة قانونية */}
          <div className={`mb-8 transform transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}>
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-teal-400 to-teal-600 rounded-full flex items-center justify-center shadow-2xl shadow-teal-500/30">
              <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.617 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-2.018 1 1 0 01-.285-1.05l1.715-5.349L11 7.708V16a2 2 0 11-2 0V7.708L6.237 6.583l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-2.018 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.79l1.599.8L9 4.323V3a1 1 0 011-1z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* العنوان الرئيسي مع تحسينات SEO */}
          <h1 className={`text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-white transform transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <span className="block">{t('hero_title')}</span>
            <span className="block text-4xl md:text-5xl lg:text-6xl text-teal-300 mt-2">
              {t('hero_subtitle')}
            </span>
          </h1>

          {/* الوصف المحسن */}
          <p className={`text-xl md:text-2xl lg:text-3xl mb-8 font-light text-gray-100 max-w-4xl leading-relaxed transform transition-all duration-1000 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {t('hero_description')}
          </p>

          {/* معلومات إضافية */}
          <div className={`mb-12 transform transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex flex-wrap justify-center items-center gap-6 text-gray-300">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">بئر مراد رايس، الجزائر</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span className="text-sm font-medium">استشارات قانونية متخصصة</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium">خبرة قانونية معتمدة</span>
              </div>
            </div>
          </div>

          {/* زر العمل الرئيسي المحسن */}
          <div className={`transform transition-all duration-1000 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
          }`}>
            <a 
              href="#contact" 
              onClick={(e) => handleNavClick(e, '#contact')}
              className="group relative inline-flex items-center justify-center gap-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold py-5 px-12 rounded-2xl text-lg lg:text-xl transition-all duration-300 ease-in-out transform hover:scale-105 hover:-translate-y-1 shadow-2xl shadow-teal-500/40 hover:shadow-teal-500/60"
              aria-label={`${t('hero_cta')} - تواصل مع الأستاذ سايج محمد`}
            >
              <span className="relative z-10">{t('hero_cta')}</span>
              {language === 'ar' ? 
                <ArrowLeftIcon className="w-6 h-6 transition-transform group-hover:-translate-x-1" /> : 
                <ArrowRightIcon className="w-6 h-6 transition-transform group-hover:translate-x-1" />
              }
              
              {/* تأثير hover متقدم */}
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            
            {/* زر ثانوي للمزيد من المعلومات */}
            <div className="mt-6">
              <a 
                href="#about" 
                onClick={(e) => handleNavClick(e, '#about')}
                className="inline-flex items-center gap-2 text-gray-200 hover:text-teal-300 font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-teal-300 pb-1"
                aria-label="تعرف على المزيد عن الأستاذ سايج محمد"
              >
                <span>تعرف على المزيد</span>
                <svg className="w-4 h-4 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* مؤشر التمرير */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroImproved;