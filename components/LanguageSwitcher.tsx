import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const GlobeIcon: React.FC<{className?: string}> = ({className}) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
    </svg>
);


const LanguageSwitcher: React.FC = () => {
    const { language, setLanguage } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages = {
        ar: 'العربية',
        fr: 'Français',
        en: 'English',
    };

    const handleSelectLanguage = (lang: 'ar' | 'fr' | 'en') => {
        setLanguage(lang);
        setIsOpen(false);
    };

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 text-sm sm:text-base text-gray-300 hover:text-teal-400 transition duration-300"
                aria-haspopup="true"
                aria-expanded={isOpen}
            >
                <GlobeIcon className="w-5 h-5" />
                <span>{language.toUpperCase()}</span>
                <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isOpen && (
                <div
                    className="absolute top-full mt-2 -right-2 md:right-0 w-36 bg-slate-800 border border-slate-700 rounded-md shadow-lg z-50"
                    role="menu"
                >
                    <ul className="p-1">
                        {Object.entries(languages).map(([code, name]) => (
                            <li key={code}>
                                <button
                                    onClick={() => handleSelectLanguage(code as 'ar' | 'fr' | 'en')}
                                    className={`w-full text-start px-3 py-2 text-sm rounded-md transition-colors ${language === code ? 'bg-teal-600 text-white' : 'text-gray-300 hover:bg-slate-700'}`}
                                    role="menuitem"
                                >
                                    {name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;