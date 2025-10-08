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
        onClose(); // Close the modal when the user clicks the WhatsApp button
    };

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
            aria-modal="true"
            role="dialog"
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg shadow-2xl w-full max-w-md m-auto transform transition-all duration-300 scale-95 opacity-0 animate-scale-in"
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside modal from closing it
                style={{ animationName: 'scale-in', animationDuration: '0.3s', animationFillMode: 'forwards' }}
            >
                <style>{`
                    @keyframes scale-in {
                        from { transform: scale(0.95); opacity: 0; }
                        to { transform: scale(1); opacity: 1; }
                    }
                `}</style>
                <header className="flex items-center justify-between p-5 border-b border-slate-200 bg-slate-50 rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 text-amber-500">
                            <GreetingIcon />
                        </div>
                        <h2 className="text-xl font-bold text-slate-800">{t('welcome_modal_title')}</h2>
                    </div>
                    <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:bg-slate-200" aria-label={t('chatbot_close')}>
                        <CloseIcon className="w-6 h-6" />
                    </button>
                </header>
                <main className="p-6">
                    <p className="text-slate-600 text-lg leading-relaxed">
                        {t('welcome_modal_message')}
                    </p>
                </main>
                <footer className="p-5 bg-slate-50 rounded-b-lg flex flex-col sm:flex-row-reverse gap-3">
                    <a
                        href="https://wa.me/213558357689"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleWhatsAppClick}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300"
                    >
                        <WhatsAppIcon className="w-6 h-6" />
                        <span>{t('welcome_modal_cta')}</span>
                    </a>
                    <button
                        onClick={onClose}
                        className="w-full sm:w-auto bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-3 px-6 rounded-lg transition-colors"
                    >
                        {t('chatbot_close')}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default WelcomeModal;