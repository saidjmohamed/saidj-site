import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { QuoteIcon } from './icons';

interface Testimonial {
    name: string;
    case_type: string;
    quote: string;
}

const Testimonials: React.FC = () => {
    const { t } = useLanguage();
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    const testimonialsData: Testimonial[] = t('testimonials_data');

    return (
        <section id="testimonials" className="py-20 bg-slate-100 overflow-hidden bg-dot-pattern">
            <div
                ref={ref}
                className={`container mx-auto px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-slate-800 mb-4">{t('testimonials_title')}</h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                        {t('testimonials_description')}
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonialsData.map((testimonial, index) => (
                        <div key={index} className="bg-white p-8 rounded-lg shadow-lg flex flex-col border border-slate-200 card-glow">
                            <QuoteIcon className="w-10 h-10 text-teal-400 mb-4" />
                            <p className="text-slate-600 italic leading-relaxed mb-6 flex-grow">
                                "{testimonial.quote}"
                            </p>
                            <div className="mt-auto">
                                <p className="font-bold text-slate-800 text-lg">{testimonial.name}</p>
                                <p className="text-sm text-slate-500">{testimonial.case_type}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;