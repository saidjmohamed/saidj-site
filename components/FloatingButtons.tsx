import React, { useState, useEffect } from 'react';
import { WhatsAppIcon, ChatbotIcon, FacebookIcon, MapPinIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface FloatingButtonsProps {
  onChatbotToggle: () => void;
  onAction?: (action: string) => void;
}

const FloatingButtons: React.FC<FloatingButtonsProps> = ({ onChatbotToggle, onAction }) => {
  const { language, t } = useLanguage();
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const hasSeenNotification = sessionStorage.getItem('chatNotificationSeen');
    if (!hasSeenNotification) {
      const timer = setTimeout(() => {
        setShowNotification(true);
        const audio = new Audio("data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBvZmYgU0hJTiBkZXNOUkMvKirru6RKvU1RII_0pcPaPeyrtSFQ6TMVAVTI4j4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4hPPMebDZVGXQj4-AAADGAYjBAMAQ4QzQIMgYxVTT324gB");
        audio.play().catch(e => {
          // Autoplay was prevented, which is common in browsers.
          // User interaction is needed to play audio.
          // We can attach it to the first user interaction if needed.
          console.log("Audio play was blocked by the browser. It will play on the next user interaction.");
        });
        sessionStorage.setItem('chatNotificationSeen', 'true');
      }, 5000); // Show after 5 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  const positionClass = language === 'ar' ? 'right-4' : 'left-4';
  const whatsappUrl = "https://wa.me/213558357689";
  const mapsUrl = "https://maps.app.goo.gl/EzkKvsuzmnYxThsGA";
  
  const handleChatbotClick = () => {
    setShowNotification(false);
    onChatbotToggle();
    if (onAction) {
      onAction('chatbot_opened');
    }
  }

  return (
    <>
      <div className={`fixed bottom-20 ${positionClass} z-50 flex flex-col items-center space-y-3 md:bottom-6`}>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg text-white hover:bg-green-600 transition-colors animate-jump"
          aria-label={t('contact_whatsapp')}
        >
          <WhatsAppIcon className="w-8 h-8" />
        </a>
        <a
          href="https://web.facebook.com/Mtr.saidj.mohamed"
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg text-white hover:bg-blue-700 transition-colors animate-jump"
          style={{ animationDelay: '0.2s' }}
          aria-label={t('follow_facebook')}
        >
          <FacebookIcon className="w-8 h-8" />
        </a>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-16 h-16 bg-sky-500 rounded-full flex items-center justify-center shadow-lg text-white hover:bg-sky-600 transition-colors animate-jump"
          style={{ animationDelay: '0.4s' }}
          aria-label={t('open_google_maps')}
        >
          <MapPinIcon className="w-8 h-8" />
        </a>
        <button
          onClick={handleChatbotClick}
          className="relative w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center shadow-lg text-white hover:bg-teal-600 transition-colors animate-jump"
          style={{ animationDelay: '0.6s' }}
          aria-label={t('open_chatbot')}
        >
          <ChatbotIcon className="w-8 h-8" />
          {showNotification && (
            <span className="absolute top-0 right-0 flex h-4 w-4">
                <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 ring-2 ring-white"></span>
            </span>
          )}
        </button>
      </div>
    </>
  );
};

export default FloatingButtons;