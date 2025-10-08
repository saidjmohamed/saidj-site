import React, { useState } from 'react';
import type { FAQItem } from '../types';
import { PlusIcon, MinusIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const FAQItemComponent: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-start text-lg font-semibold text-slate-800 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span>{item.question}</span>
        {isOpen ? <MinusIcon className="w-6 h-6 text-slate-500 flex-shrink-0" /> : <PlusIcon className="w-6 h-6 text-teal-500 flex-shrink-0" />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen pt-3' : 'max-h-0'}`}
      >
        <p className="text-slate-600 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
};


const FAQ: React.FC = () => {
  const { t } = useLanguage();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
  const faqData: FAQItem[] = t('faq_data');

  return (
    <section id="faq" className="py-20 bg-slate-100 overflow-hidden">
      <div
        ref={ref}
        className={`container mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">{t('faq_title')}</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            {t('faq_description')}
          </p>
        </div>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
          {faqData.map((item, index) => (
            <FAQItemComponent key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;