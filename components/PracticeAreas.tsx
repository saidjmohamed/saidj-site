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
        <section id="practice-areas" className="py-20 bg-slate-50 overflow-hidden bg-dot-pattern">
            <div
                ref={ref}
                className={`container mx-auto px-6 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
                <h2 className="text-4xl font-bold text-slate-800 mb-4">{t('practice_areas_title')}</h2>
                <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
                    {t('practice_areas_description')}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {practiceAreasData.map((area, index) => (
                        <div key={index} className="bg-white border border-slate-200 p-8 rounded-lg shadow-lg text-start flex flex-col card-glow">
                            <div className="flex items-center mb-5">
                                <div className={`w-12 h-12 me-4 flex-shrink-0 ${area.color}`}>
                                    {renderIcon(area.icon)}
                                </div>
                                <h3 className="text-2xl font-bold text-slate-800">{area.title}</h3>
                            </div>
                            <ul className="space-y-2 text-slate-600 flex-grow">
                                {area.cases.map((caseItem, caseIndex) => (
                                    <li key={caseIndex} className="flex items-start">
                                        <svg className="w-5 h-5 text-teal-500 me-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                        <span>{caseItem}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PracticeAreas;