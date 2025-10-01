import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import Signature from './Signature';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const About: React.FC = () => {
  const { t } = useLanguage();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="about" className="py-20 bg-white overflow-hidden bg-dot-pattern">
      <div
        ref={ref}
        className={`container mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/3 flex justify-center">
            <img 
              src="https://i.ibb.co/LXS6Q1GQ/lawyer.jpg" 
              alt={t('lawyer_name')}
              className="rounded-full shadow-2xl w-64 h-64 md:w-80 md:h-80 object-cover object-top"
            />
          </div>
          <div className="lg:w-2/3 text-center lg:text-start">
            <h2 className="text-4xl font-bold text-slate-800 mb-6">{t('about_title')}</h2>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              {t('about_p1')}
            </p>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              {t('about_p2')}
            </p>
            <div className="flex justify-center lg:justify-start">
                <Signature className="w-48 h-auto text-slate-700" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;