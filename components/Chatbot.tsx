import React, { useState, useRef, useEffect } from 'react';
import { CloseIcon, SendIcon, UserIcon, BotIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatbotProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  sender: 'user' | 'bot';
  text: string;
  suggestions?: string[];
}

// Function to safely get the API key
const getApiKey = (): string | undefined => {
  // Check environment variables
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY;
  }
  // Check window object (injected by Netlify)
  if (typeof window !== 'undefined' && (window as any).GEMINI_API_KEY) {
    return (window as any).GEMINI_API_KEY;
  }
  return undefined;
};

// Fallback responses for common questions
const getFallbackResponse = (message: string, language: string): string => {
  const messageLower = message.toLowerCase();
  
  if (language === 'ar') {
    if (messageLower.includes('اختصاص') || messageLower.includes('خدم') || messageLower.includes('مجال')) {
      return `نحن نتخصص في مختلف فروع القانون:\n\n📜 القانون المدني\n👪 قانون الأسرة\n💼 القانون التجاري\n⚖️ القانون الجزائي\n🏢 القانون الإداري\n🏠 القانون العقاري\n\nللحصول على استشارة مفصلة، تواصل معنا:\n📞 +213558357689\n📧 SAIDJ.MOHAMED@GMAIL.COM`;
    }
    
    if (messageLower.includes('موعد') || messageLower.includes('حجز')) {
      return `يمكنك حجز موعد لاستشارة بعدة طرق:\n\n📞 اتصال مباشر: +213558357689\n📱 واتساب: +213558357689\n📧 بريد إلكتروني: SAIDJ.MOHAMED@GMAIL.COM\n\nأوقات العمل: السبت إلى الخميس من 9ص إلى 5م`;
    }
    
    if (messageLower.includes('موقع') || messageLower.includes('عنوان') || messageLower.includes('أين')) {
      return `مكتبنا يقع في:\n📍 12 شارع الإخوة بوعدو\nبئر مراد رايس، الجزائر\n(مقابل المحكمة الإدارية)\n\nللوصول إلينا:\n📞 +213558357689\n📱 واتساب: +213558357689`;
    }
    
    if (messageLower.includes('تكلف') || messageLower.includes('سعر') || messageLower.includes('أتعاب')) {
      return `تختلف أتعاب المحاماة حسب نوع وتعقيد القضية.\n\n🔍 الاستشارة الأولى: رسوم رمزية\n💼 التمثيل القانوني: حسب القضية\n\nلمعرفة التفاصيل الدقيقة، اتصل بنا:\n📞 +213558357689`;
    }
    
    return `شكراً لك على تواصلك معنا! 😊\n\nللحصول على إجابة دقيقة ومفصلة عن استفسارك، يرجى التواصل معنا مباشرة:\n\n📞 الهاتف: +213558357689\n📱 واتساب: +213558357689\n📧 البريد: SAIDJ.MOHAMED@GMAIL.COM\n📍 العنوان: 12 شارع الإخوة بوعدو، بئر مراد رايس\n\nالأستاذ سايج محمد في خدمتك 👍`;
  } else if (language === 'fr') {
    if (messageLower.includes('spécialis') || messageLower.includes('domaine') || messageLower.includes('service')) {
      return `Nos domaines de spécialité incluent:\n\n📜 Droit Civil\n👪 Droit de la Famille\n💼 Droit Commercial\n⚖️ Droit Pénal\n🏢 Droit Administratif\n🏠 Droit Immobilier\n\nPour une consultation détaillée, contactez-nous:\n📞 +213558357689\n📧 SAIDJ.MOHAMED@GMAIL.COM`;
    }
    
    if (messageLower.includes('rendez-vous') || messageLower.includes('rdv') || messageLower.includes('appointment')) {
      return `Vous pouvez prendre rendez-vous de plusieurs façons:\n\n📞 Appel direct: +213558357689\n📱 WhatsApp: +213558357689\n📧 Email: SAIDJ.MOHAMED@GMAIL.COM\n\nHeures d'ouverture: Samedi-Jeudi 9h-17h`;
    }
    
    return `Merci de nous contacter! 😊\n\nPour une réponse précise à votre question, veuillez nous contacter directement:\n\n📞 Téléphone: +213558357689\n📱 WhatsApp: +213558357689\n📧 Email: SAIDJ.MOHAMED@GMAIL.COM\n📍 Adresse: 12 Rue des Frères Bouaddou, Bir Mourad Raïs\n\nMaître Saidj Mohamed à votre service 👍`;
  } else {
    // English
    if (messageLower.includes('speciali') || messageLower.includes('area') || messageLower.includes('service')) {
      return `Our areas of expertise include:\n\n📜 Civil Law\n👪 Family Law\n💼 Commercial Law\n⚖️ Criminal Law\n🏢 Administrative Law\n🏠 Real Estate Law\n\nFor detailed consultation, contact us:\n📞 +213558357689\n📧 SAIDJ.MOHAMED@GMAIL.COM`;
    }
    
    if (messageLower.includes('appointment') || messageLower.includes('meeting') || messageLower.includes('book')) {
      return `You can book an appointment in several ways:\n\n📞 Direct call: +213558357689\n📱 WhatsApp: +213558357689\n📧 Email: SAIDJ.MOHAMED@GMAIL.COM\n\nOffice hours: Saturday-Thursday 9am-5pm`;
    }
    
    return `Thank you for contacting us! 😊\n\nFor a precise answer to your inquiry, please contact us directly:\n\n📞 Phone: +213558357689\n📱 WhatsApp: +213558357689\n📧 Email: SAIDJ.MOHAMED@GMAIL.COM\n📍 Address: 12 Frères Bouaddou Street, Bir Mourad Raïs\n\nMr. Saidj Mohamed at your service 👍`;
  }
};

// Direct API call to Gemini with retry logic
const callGeminiAPI = async (message: string, systemInstruction: string, language: string, retries = 2): Promise<string> => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return getFallbackResponse(message, language);
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemInstruction}\n\nUser: ${message}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      });
      
      if (!response.ok) {
        if (response.status === 429 && attempt < retries) {
          // Rate limited, wait and retry
          await new Promise(resolve => setTimeout(resolve, 1000 * (attempt + 1)));
          continue;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text && text.trim()) {
        return text.trim();
      } else {
        throw new Error('Empty response from API');
      }
      
    } catch (error) {
      console.error(`Gemini API attempt ${attempt + 1} failed:`, error);
      
      if (attempt === retries) {
        // Final attempt failed, use fallback
        return getFallbackResponse(message, language);
      }
    }
  }
  
  return getFallbackResponse(message, language);
};

const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ 
        sender: 'bot', 
        text: t('chatbot_welcome'),
        suggestions: t('chatbot_suggestions')
      }]);
    }
  }, [isOpen, language, t, messages.length]);
  
  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: messageText };
    setMessages(prev => {
      // Remove suggestions from previous bot message
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];
      if (lastMessage && lastMessage.sender === 'bot' && lastMessage.suggestions) {
        delete lastMessage.suggestions;
      }
      return [...newMessages, userMessage];
    });
    
    setInput('');
    setIsLoading(true);

    try {
      const botResponse = await callGeminiAPI(messageText, t('chatbot_system_instruction'), language);
      setMessages(prev => [...prev, { sender: 'bot', text: botResponse }]);
    } catch (error) {
      console.error('Error in chat:', error);
      const fallbackResponse = getFallbackResponse(messageText, language);
      setMessages(prev => [...prev, { sender: 'bot', text: fallbackResponse }]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    sendMessage(suggestion);
  };

  const positionClasses = language === 'ar' 
    ? 'right-4 md:right-24' 
    : 'left-4 md:left-24';

  if (!isOpen) return null;

  return (
    <div className={`fixed bottom-20 md:bottom-4 ${positionClasses} z-[60] w-[calc(100%-2rem)] max-w-sm h-[70vh] flex flex-col bg-white rounded-xl shadow-2xl`} role="dialog" aria-modal="true" aria-labelledby="chatbot-title">
      <header className="flex items-center justify-between p-4 bg-slate-800 text-white rounded-t-xl">
        <h2 id="chatbot-title" className="font-bold text-lg">{t('chatbot_title')}</h2>
        <button onClick={onClose} aria-label={t('chatbot_close')} className="p-1 rounded-full hover:bg-slate-700">
          <CloseIcon className="w-6 h-6" />
        </button>
      </header>
      
      <div className="flex-1 p-4 overflow-y-auto bg-slate-100">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index}>
              <div className={`flex items-start gap-3 ${msg.sender === 'user' ? `justify-end ${language === 'ar' ? 'flex-row-reverse' : ''}` : `justify-start ${language === 'fr' || language === 'en' ? 'flex-row-reverse' : ''}`}`}>
                {msg.sender === 'bot' ? <BotIcon /> : <UserIcon />}
                <div className={`max-w-xs md:max-w-sm rounded-2xl p-3 text-base ${msg.sender === 'user' ? 'bg-teal-500 text-white rounded-br-none' : 'bg-slate-200 text-slate-800 rounded-bl-none'}`}>
                  <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                </div>
              </div>
              {msg.sender === 'bot' && msg.suggestions && (
                <div className="flex flex-wrap gap-2 mt-3" dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  {msg.suggestions.map((s, i) => (
                    <button key={i} onClick={() => handleSuggestionClick(s)} className="bg-white border border-slate-300 text-slate-700 text-sm px-3 py-1 rounded-full hover:bg-slate-200 transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          {/* Loading indicator */}
          {isLoading && (
            <div className="flex items-start gap-3 justify-start">
              <BotIcon />
              <div className="bg-slate-200 text-slate-800 rounded-2xl rounded-bl-none p-3">
                <div className="flex items-center space-x-1">
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                  <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <footer className="p-3 border-t bg-white rounded-b-xl">
        <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t('chatbot_placeholder')}
            className="flex-1 w-full px-4 py-2 bg-slate-100 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500"
            disabled={isLoading}
            aria-label={t('chatbot_placeholder')}
          />
          <button type="submit" disabled={isLoading || !input.trim()} className="p-3 bg-slate-700 text-white rounded-full disabled:bg-slate-400 hover:bg-slate-800 transition-colors" aria-label={t('chatbot_send')}>
            <SendIcon className="w-5 h-5" />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default Chatbot;