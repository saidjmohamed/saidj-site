import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import ErrorDisplay from './components/ErrorDisplay';
import { translations } from './translations';
import { getInitialLanguage, Language } from './contexts/LanguageContext';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}
const root = ReactDOM.createRoot(rootElement);

const getApiKey = (): string | undefined => {
  // First, check for environment variable (Vite uses import.meta.env)
  if (import.meta.env.VITE_GEMINI_API_KEY) {
    return import.meta.env.VITE_GEMINI_API_KEY as string;
  }
  
  // Then, check if key injected by hosting platform (like Netlify/Vercel)
  if ((window as any).GEMINI_API_KEY && (window as any).GEMINI_API_KEY.startsWith('AIza')) {
    return (window as any).GEMINI_API_KEY;
  }
  
  // Return undefined if no API key is found
  return undefined;
};

// This function attempts to render the app.
// It will be called after the entire page is loaded to ensure any script injection has run.
const initializeApp = () => {
  const apiKey = getApiKey();
  
  if (apiKey && apiKey.startsWith('AIza')) {
    // If key exists and looks valid, render the main app
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    // If the key is missing or invalid, render a helpful error page
    const lang: Language = getInitialLanguage();
    root.render(
      <ErrorDisplay
        title={translations[lang].error_title}
        message_p1={translations[lang].error_message_p1}
        message_p2={translations[lang].error_message_p2}
      />
    );
  }
};

// Wait for the entire page to load, including any injected scripts.
window.addEventListener('load', initializeApp);
