import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { GreetingIcon, WhatsAppIcon, CloseIcon } from './icons';

interface WelcomeModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const WelcomeModal: React.FC<WelcomeModalProps> = ({ isOpen, onClose }) => {
    const { t } = useLanguage();

    if (!isOpen) {
        return null;
    }

    const handleWhatsAppClick = () => {
        onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div
                className="bg-gradient-to-br from-[#1a2744] to-[#0a1628] rounded-2xl shadow-2xl w-full max-w-md m-auto transform transition-all duration-300 scale-95 opacity-0 animate-scale-in border border-[#d4af37]/30"
                onClick={(e) => e.stopPropagation()}
                style={{ animationName: 'scale-in', animationDuration: '0.3s', animationFillMode: 'forwards' }}
            >
                <style>{`
                    @keyframes scale-in {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                `}</style>
                <header className="flex items-center justify-between p-5 border-b border-[#d4af37]/20 bg-[#1a2744]/50 rounded-t-2xl">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-[#d4af37] to-[#aa8a2a] text-[#0a1628]">
                            <GreetingIcon />
                        </div>
                        <h2 className="text-xl font-bold text-white">{t('welcome_modal_title')}</h2>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-all" aria-label={t('chatbot_close')}>
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </header>
                <main className="p-6">
                    <p className="text-white/80 text-lg leading-relaxed">
                        {t('welcome_modal_message')}
                    </p>
                </main>
                <footer className="p-5 bg-[#0a1628]/50 rounded-b-2xl flex flex-col sm:flex-row-reverse gap-3">
                    <a
                        href="https://wa.me/213558357689"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleWhatsAppClick}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                    >
                        <WhatsAppIcon className="w-6 h-6" />
                        <span>{t('welcome_modal_cta')}</span>
                    </a>
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-xl transition-all border border-white/20"
                    >
                        {t('chatbot_close')}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default WelcomeModal;