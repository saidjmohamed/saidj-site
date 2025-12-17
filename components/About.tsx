import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Signature from './Signature';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const About: React.FC = () => {
  const { t } = useLanguage();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="about" className="py-24 overflow-hidden relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>

      <div
        ref={ref}
        className={`container mx-auto px-6 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Profile Image */}
          <div className="lg:w-1/3 flex justify-center">
            <div className="relative group">
              {/* Glow Effect Behind Image */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#aa8a2a] rounded-full blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>

              {/* Image Container */}
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#d4af37] via-[#f4d984] to-[#d4af37] rounded-full opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src="https://i.ibb.co/LXS6Q1GQ/lawyer.jpg"
                  alt={t('lawyer_name')}
                  className="relative rounded-full w-64 h-64 md:w-80 md:h-80 object-cover object-top border-4 border-[#0a1628] shadow-2xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-[#d4af37] rounded-full opacity-60 animate-float"></div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-[#3b82f6] rounded-full opacity-50 animate-float" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-2/3 text-center lg:text-start">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('about_title')}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#d4af37] via-[#f4d984] to-[#d4af37] mx-auto lg:mx-0 rounded-full mb-8"></div>

            <p className="text-lg text-white/80 leading-relaxed mb-6">
              {t('about_p1')}
            </p>

            <p className="text-lg text-white/80 leading-relaxed mb-10">
              {t('about_p2')}
            </p>

            {/* Signature */}
            <div className="flex justify-center lg:justify-start">
              <div className="p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-[#d4af37]/20">
                <Signature className="w-48 h-auto text-[#d4af37]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;