import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FacebookIcon } from './icons';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-slate-400 py-6">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center mb-4">
            <a 
                href="https://web.facebook.com/Mtr.saidj.mohamed" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={t('follow_facebook')}
                className="text-slate-400 hover:text-white transition-colors"
            >
                <FacebookIcon className="w-8 h-8" />
            </a>
        </div>
        <p>{t('footer_copyright')}</p>
        <p className="text-sm mt-2">
          {t('footer_disclaimer')}
        </p>
        <div className="mt-4 text-xs text-slate-600">
            <a href="#admin" className="hover:text-slate-400 transition-colors">
                Admin Panel
            </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;