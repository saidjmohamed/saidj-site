import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import * as Icons from './icons';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const PracticeAreas: React.FC = () => {
    const { t } = useLanguage();
    const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    const practiceAreasData: { title: string; icon: keyof typeof Icons; color: string; cases: string[] }[] = t('practice_areas_data');

    const renderIcon = (iconName: keyof typeof Icons) => {
        const IconComponent = Icons[iconName];
        return IconComponent ? <IconComponent /> : null;
    };

    return (
        <section id="practice-areas" className="py-24 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-dot-pattern opacity-30"></div>

            <div
                ref={ref}
                className={`container mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                {/* Section Header */}
                <div className="mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">{t('practice_areas_title')}</h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#d4af37] via-[#f4d984] to-[#d4af37] mx-auto rounded-full mb-6"></div>
                    <p className="text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
                        {t('practice_areas_description')}
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {practiceAreasData.map((area, index) => (
                        <div
                            key={index}
                            className="group relative bg-gradient-to-br from-[#1a2744]/90 to-[#0a1628]/90 backdrop-blur-sm border border-[#d4af37]/20 p-8 rounded-2xl text-start flex flex-col transition-all duration-500 hover:border-[#d4af37]/50 hover:shadow-2xl hover:shadow-[#d4af37]/10 hover:-translate-y-2"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Top Accent Line */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4af37] via-[#f4d984] to-[#d4af37] rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            {/* Icon and Title */}
                            <div className="flex items-center mb-6">
                                <div className="w-14 h-14 me-4 flex-shrink-0 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#d4af37]/20 to-[#aa8a2a]/10 border border-[#d4af37]/30 text-[#d4af37] group-hover:scale-110 group-hover:border-[#d4af37]/50 transition-all duration-300">
                                    {renderIcon(area.icon)}
                                </div>
                                <h3 className="text-2xl font-bold text-white group-hover:text-[#f4d984] transition-colors duration-300">{area.title}</h3>
                            </div>

                            {/* Cases List */}
                            <ul className="space-y-3 flex-grow">
                                {area.cases.map((caseItem, caseIndex) => (
                                    <li key={caseIndex} className="flex items-start text-white/70 group-hover:text-white/90 transition-colors duration-300">
                                        <svg className="w-5 h-5 text-[#d4af37] me-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        <span>{caseItem}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Hover Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#d4af37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PracticeAreas;