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
  // Prioritize the key injected by Netlify for the live site
  if ((window as any).GEMINI_API_KEY && (window as any).GEMINI_API_KEY.startsWith('AIza')) {
    return (window as any).GEMINI_API_KEY;
  }
  // Fallback key for local/preview environment (like AI Studio)
  return "AIzaSyDQBXT3beWMHm21zo8Rvk0tYf7noxj4OPs";
};

// This function attempts to render the app.
// It will be called after the entire page is loaded to ensure Netlify's script injection has run.
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
      <React.StrictMode>
        <ErrorDisplay 
            title={translations[lang].error_title}
            message_p1={translations[lang].error_message_p1}
            message_p2={translations[lang].error_message_p2}
        />
      </React.StrictMode>
    );
  }
};

// Wait for the entire page to load, including Netlify's injected script.
// This is the most robust way to avoid the race condition that causes a white screen.
window.addEventListener('load', initializeApp);