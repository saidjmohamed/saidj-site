import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
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
  // Prioritize the key injected by Netlify for the live site
  if ((window as any).GEMINI_API_KEY && (window as any).GEMINI_API_KEY.startsWith('AIza')) {
    return (window as any).GEMINI_API_KEY;
  }
  // Fallback key for local/preview environment (like AI Studio)
  return "AIzaSyDQBXT3beWMHm21zo8Rvk0tYf7noxj4OPs";
};


const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  const initializeChat = () => {
    isInitialized.current = false;
    setMessages([{ 
        sender: 'bot', 
        text: t('chatbot_welcome'),
        suggestions: t('chatbot_suggestions')
    }]);
    
    try {
      const apiKey = getApiKey();
      if (!apiKey) {
        throw new Error("API key not found.");
      }
      const ai = new GoogleGenAI({ apiKey });
      chatRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: t('chatbot_system_instruction'),
        },
      });
      isInitialized.current = true;
    } catch (error) {
      console.error("Failed to initialize Gemini API:", error);
      setMessages(prev => [...prev, {sender: 'bot', text: 'Sorry, the smart assistant could not be initialized.'}]);
    }
  };

  useEffect(() => {
    if (isOpen) {
      initializeChat();
    }
  }, [isOpen, language, t]);
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { sender: 'user', text: messageText };
    setMessages(prev => {
        // Remove suggestions from previous bot message
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length-1];
        if (lastMessage.sender === 'bot' && lastMessage.suggestions) {
            delete lastMessage.suggestions;
        }
        return [...newMessages, userMessage];
    });
    setInput('');
    setIsLoading(true);
    setMessages(prev => [...prev, { sender: 'bot', text: '' }]);

    if (!chatRef.current || !isInitialized.current) {
        setIsLoading(false);
        setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1] = { sender: 'bot', text: 'Sorry, the chat session is not initialized.' };
            return newMessages;
        });
        return;
    }

    try {
      const stream = await chatRef.current.sendMessageStream({ message: messageText });
      
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          const lastMsg = newMessages[newMessages.length - 1];
          lastMsg.text = lastMsg.text + chunkText;
          return newMessages;
        });
      }

    } catch (error) {
      console.error('Error sending message to Gemini:', error);
       setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length-1] = { sender: 'bot', text: 'Sorry, an error occurred. Please try again.' };
          return newMessages;
        });
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
                    {msg.text ? (
                      <p style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</p>
                    ) : (
                      isLoading && index === messages.length - 1 && (
                        <div className="flex items-center justify-center space-x-1 p-2">
                            <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                            <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                            <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></span>
                        </div>
                      )
                    )}
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