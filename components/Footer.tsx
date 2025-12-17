import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { FacebookIcon } from './icons';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="relative bg-gradient-to-b from-[#0a1628] to-[#050a14] text-white/70 py-12 overflow-hidden">
      {/* Top Border Accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent"></div>

      {/* Background Glow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-32 bg-[#d4af37]/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-6 text-center relative z-10">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 bg-gradient-to-r from-[#d4af37] to-[#aa8a2a] rounded-xl flex items-center justify-center text-[#0a1628] font-bold text-2xl shadow-lg shadow-[#d4af37]/20">
            ⚖️
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center mb-6">
          <a
            href="https://web.facebook.com/Mtr.saidj.mohamed"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('follow_facebook')}
            className="w-12 h-12 flex items-center justify-center rounded-full bg-white/5 border border-[#d4af37]/20 text-white/60 hover:text-[#d4af37] hover:border-[#d4af37]/50 hover:bg-[#d4af37]/10 transition-all duration-300 hover:scale-110"
          >
            <FacebookIcon className="w-6 h-6" />
          </a>
        </div>

        {/* Divider */}
        <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent mx-auto mb-6"></div>

        {/* Copyright */}
        <p className="text-white/60 font-medium">{t('footer_copyright')}</p>
        <p className="text-sm mt-2 text-white/40 max-w-xl mx-auto leading-relaxed">
          {t('footer_disclaimer')}
        </p>

        {/* Admin Link */}
        <div className="mt-6 pt-6 border-t border-white/5">
          <a href="#admin" className="text-xs text-white/30 hover:text-[#d4af37] transition-colors">
            Admin Panel
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;