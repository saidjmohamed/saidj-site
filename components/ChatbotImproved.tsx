import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { CloseIcon, SendIcon, UserIcon, BotIcon, WarningIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface ChatbotImprovedProps {
  isOpen: boolean;
  onClose: () => void;
}

interface Message {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
  suggestions?: string[];
  error?: boolean;
}

interface ChatError {
  type: 'api_key' | 'network' | 'rate_limit' | 'general';
  message: string;
}

// دالة محسنة للحصول على مفتاح API مع تحسينات الأمان
const getApiKey = (): { key: string | null; error: ChatError | null } => {
  try {
    // التحقق من المفتاح المحدد من قبل Netlify أولاً
    if ((window as any).GEMINI_API_KEY && (window as any).GEMINI_API_KEY.startsWith('AIza')) {
      return { key: (window as any).GEMINI_API_KEY, error: null };
    }
    
    // مفتاح احتياطي للبيئة المحلية
    const fallbackKey = "AIzaSyDQBXT3beWMHm21zo8Rvk0tYf7noxj4OPs";
    if (fallbackKey && fallbackKey.startsWith('AIza')) {
      return { key: fallbackKey, error: null };
    }
    
    return {
      key: null,
      error: {
        type: 'api_key',
        message: 'API key not configured properly'
      }
    };
  } catch (error) {
    return {
      key: null,
      error: {
        type: 'general',
        message: 'Failed to retrieve API key'
      }
    };
  }
};

// مكون للرسائل الفردية
const MessageBubble: React.FC<{ 
  message: Message; 
  language: string; 
  onSuggestionClick: (suggestion: string) => void;
}> = React.memo(({ message, language, onSuggestionClick }) => {
  const isUser = message.sender === 'user';
  const isRTL = language === 'ar';
  
  return (
    <div className="message-wrapper">
      <div className={`flex items-start gap-3 ${
        isUser 
          ? `justify-end ${isRTL ? 'flex-row-reverse' : ''}` 
          : `justify-start ${!isRTL ? 'flex-row-reverse' : ''}`
      }`}>
        <div className="flex-shrink-0">
          {isUser ? <UserIcon /> : <BotIcon />}
        </div>
        <div className={`max-w-xs md:max-w-sm rounded-2xl p-3 text-base break-words ${
          isUser 
            ? 'bg-teal-500 text-white rounded-br-none' 
            : message.error 
              ? 'bg-red-100 text-red-800 rounded-bl-none border border-red-200'
              : 'bg-slate-200 text-slate-800 rounded-bl-none'
        }`}>
          {message.error && (
            <div className="flex items-center gap-2 mb-2 text-red-600">
              <WarningIcon className="w-4 h-4" />
              <span className="text-xs font-medium">خطأ في الإرسال</span>
            </div>
          )}
          <p style={{ whiteSpace: 'pre-wrap', lineHeight: '1.5' }}>
            {message.text}
          </p>
          <div className="mt-1 text-xs opacity-60">
            {message.timestamp.toLocaleTimeString(language === 'ar' ? 'ar-SA' : 'en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </div>
        </div>
      </div>
      
      {/* اقتراحات محسنة */}
      {!isUser && message.suggestions && (
        <div className="flex flex-wrap gap-2 mt-3 px-12" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {message.suggestions.map((suggestion, i) => (
            <button
              key={i}
              onClick={() => onSuggestionClick(suggestion)}
              className="bg-white border border-slate-300 text-slate-700 text-sm px-3 py-2 rounded-full hover:bg-teal-50 hover:border-teal-300 hover:text-teal-700 transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
              aria-label={`إرسال اقتراح: ${suggestion}`}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
});

// مكون مؤشر الكتابة
const TypingIndicator: React.FC = React.memo(() => (
  <div className="flex items-center justify-center space-x-1 p-4">
    <div className="flex space-x-1">
      <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
      <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
      <span className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></span>
    </div>
    <span className="mr-2 text-sm text-slate-600">يكتب المساعد...</span>
  </div>
));

const ChatbotImproved: React.FC<ChatbotImprovedProps> = ({ isOpen, onClose }) => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatError, setChatError] = useState<ChatError | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const chatRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialized = useRef(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // إنشاء ID فريد للرسائل
  const generateMessageId = useCallback(() => {
    return `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }, []);

  // تهيئة محسنة للشات
  const initializeChat = useCallback(async () => {
    setChatError(null);
    setRetryCount(0);
    
    const welcomeMessage: Message = {
      id: generateMessageId(),
      sender: 'bot',
      text: t('chatbot_welcome'),
      timestamp: new Date(),
      suggestions: t('chatbot_suggestions')
    };
    
    setMessages([welcomeMessage]);
    
    try {
      const { key, error } = getApiKey();
      
      if (error) {
        setChatError(error);
        return;
      }
      
      if (key) {
        const ai = new GoogleGenAI({ apiKey: key });
        chatRef.current = ai.chats.create({
          model: 'gemini-2.5-flash',
          config: {
            systemInstruction: t('chatbot_system_instruction'),
            safetySettings: [
              {
                category: 'HARM_CATEGORY_HARASSMENT',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              },
              {
                category: 'HARM_CATEGORY_HATE_SPEECH',
                threshold: 'BLOCK_MEDIUM_AND_ABOVE',
              }
            ],
            generationConfig: {
              temperature: 0.7,
              topP: 0.8,
              topK: 40,
              maxOutputTokens: 1024,
            }
          },
        });
        isInitialized.current = true;
      }
    } catch (error) {
      console.error("Failed to initialize Gemini API:", error);
      setChatError({
        type: 'general',
        message: 'فشل في تهيئة المساعد الذكي. يرجى المحاولة لاحقاً.'
      });
    }
  }, [t, generateMessageId]);

  // تهيئة عند فتح الشات
  useEffect(() => {
    if (isOpen && !isInitialized.current) {
      initializeChat();
    }
  }, [isOpen, initializeChat]);

  // تمرير تلقائي للرسائل
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'nearest'
      });
    }
  }, [messages, isLoading]);

  // تركيز على حقل الإدخال عند فتح الشات
  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMinimized]);

  // إرسال رسالة محسن مع معالجة أفضل للأخطاء
  const sendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateMessageId(),
      sender: 'user',
      text: messageText.trim(),
      timestamp: new Date()
    };

    // إلغاء الاقتراحات من آخر رسالة بوت
    setMessages(prev => {
      const newMessages = [...prev];
      const lastMessage = newMessages[newMessages.length - 1];
      if (lastMessage?.sender === 'bot' && lastMessage.suggestions) {
        delete lastMessage.suggestions;
      }
      return [...newMessages, userMessage];
    });

    setInput('');
    setIsLoading(true);
    setChatError(null);

    // إنشاء رسالة بوت فارغة
    const botMessageId = generateMessageId();
    setMessages(prev => [...prev, {
      id: botMessageId,
      sender: 'bot',
      text: '',
      timestamp: new Date()
    }]);

    // التحقق من تهيئة الشات
    if (!chatRef.current || !isInitialized.current) {
      setIsLoading(false);
      setMessages(prev => {
        const newMessages = [...prev];
        const lastMsg = newMessages[newMessages.length - 1];
        if (lastMsg.id === botMessageId) {
          lastMsg.text = 'عذراً، المساعد الذكي غير متاح حالياً. يرجى المحاولة لاحقاً.';
          lastMsg.error = true;
        }
        return newMessages;
      });
      return;
    }

    try {
      // إنشاء AbortController للتحكم في إلغاء الطلب
      abortControllerRef.current = new AbortController();
      
      const stream = await chatRef.current.sendMessageStream({ 
        message: messageText,
        signal: abortControllerRef.current.signal
      });
      
      let accumulatedText = '';
      
      for await (const chunk of stream) {
        if (abortControllerRef.current?.signal.aborted) {
          break;
        }
        
        const chunkText = chunk.text;
        accumulatedText += chunkText;
        
        setMessages(prev => {
          const newMessages = [...prev];
          const targetMessage = newMessages.find(msg => msg.id === botMessageId);
          if (targetMessage) {
            targetMessage.text = accumulatedText;
            targetMessage.timestamp = new Date();
          }
          return newMessages;
        });
      }
      
      setRetryCount(0); // إعادة تعيين عداد المحاولات عند النجاح
      
    } catch (error: any) {
      console.error('Error sending message to Gemini:', error);
      
      let errorMessage = 'عذراً، حدث خطأ. يرجى المحاولة مرة أخرى.';
      let errorType: ChatError['type'] = 'general';
      
      if (error.name === 'AbortError') {
        errorMessage = 'تم إلغاء الطلب.';
      } else if (error.message?.includes('API key')) {
        errorType = 'api_key';
        errorMessage = 'خطأ في مفتاح API. يرجى الاتصال بالدعم الفني.';
      } else if (error.message?.includes('rate limit')) {
        errorType = 'rate_limit';
        errorMessage = 'تم تجاوز الحد المسموح من الطلبات. يرجى المحاولة بعد قليل.';
      } else if (error.message?.includes('network')) {
        errorType = 'network';
        errorMessage = 'خطأ في الاتصال بالإنترنت. يرجى التحقق من اتصالك.';
      }
      
      setChatError({ type: errorType, message: errorMessage });
      
      setMessages(prev => {
        const newMessages = [...prev];
        const targetMessage = newMessages.find(msg => msg.id === botMessageId);
        if (targetMessage) {
          targetMessage.text = errorMessage;
          targetMessage.error = true;
          targetMessage.timestamp = new Date();
        }
        return newMessages;
      });
      
      setRetryCount(prev => prev + 1);
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  }, [isLoading, generateMessageId]);

  // معالج إرسال النموذج
  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
    }
  }, [input, sendMessage]);

  // معالج النقر على الاقتراحات
  const handleSuggestionClick = useCallback((suggestion: string) => {
    sendMessage(suggestion);
  }, [sendMessage]);

  // إعادة المحاولة
  const handleRetry = useCallback(() => {
    if (retryCount < 3) {
      initializeChat();
    }
  }, [retryCount, initializeChat]);

  // إلغاء الطلبات عند الإغلاق
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // تحديد موضع الشات
  const positionClasses = useMemo(() => {
    return language === 'ar' 
      ? 'right-4 md:right-24' 
      : 'left-4 md:left-24';
  }, [language]);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed bottom-20 md:bottom-4 ${positionClasses} z-[60] w-[calc(100%-2rem)] max-w-sm flex flex-col bg-white rounded-xl shadow-2xl border border-slate-200 transition-all duration-300 ${
        isMinimized ? 'h-14' : 'h-[70vh]'
      }`} 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="chatbot-title"
      dir={language === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* رأس الشات المحسن */}
      <header className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-800 to-slate-700 text-white rounded-t-xl">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <h2 id="chatbot-title" className="font-bold text-lg">
            {t('chatbot_title')}
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            aria-label={isMinimized ? 'توسيع الشات' : 'تصغير الشات'}
            className="p-1 rounded-full hover:bg-slate-600 transition-colors"
          >
            <svg className={`w-5 h-5 transition-transform ${isMinimized ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <button 
            onClick={onClose} 
            aria-label={t('chatbot_close')}
            className="p-1 rounded-full hover:bg-slate-600 transition-colors"
          >
            <CloseIcon className="w-6 h-6" />
          </button>
        </div>
      </header>
      
      {!isMinimized && (
        <>
          {/* منطقة الرسائل */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 custom-scrollbar">
            {chatError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-800 mb-2">
                  <WarningIcon className="w-5 h-5" />
                  <span className="font-semibold">خطأ في المساعد الذكي</span>
                </div>
                <p className="text-red-700 text-sm mb-3">{chatError.message}</p>
                {retryCount < 3 && (
                  <button
                    onClick={handleRetry}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700 transition-colors"
                  >
                    إعادة المحاولة ({3 - retryCount} محاولات متبقية)
                  </button>
                )}
              </div>
            )}
            
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  language={language}
                  onSuggestionClick={handleSuggestionClick}
                />
              ))}
              
              {isLoading && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* قسم الإدخال */}
          <footer className="p-3 border-t bg-white rounded-b-xl">
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={t('chatbot_placeholder')}
                className="flex-1 w-full px-4 py-3 bg-slate-100 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-200"
                disabled={isLoading || !!chatError}
                aria-label={t('chatbot_placeholder')}
                maxLength={500}
              />
              <button 
                type="submit" 
                disabled={isLoading || !input.trim() || !!chatError}
                className="p-3 bg-teal-600 text-white rounded-full disabled:bg-slate-400 hover:bg-teal-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2" 
                aria-label={t('chatbot_send')}
              >
                <SendIcon className={`w-5 h-5 ${isLoading ? 'animate-pulse' : ''}`} />
              </button>
            </form>
            
            {/* عداد الأحرف */}
            <div className="text-xs text-slate-500 mt-2 text-center">
              {input.length}/500 حرف
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default ChatbotImproved;